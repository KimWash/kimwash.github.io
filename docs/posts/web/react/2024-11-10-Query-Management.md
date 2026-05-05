---
layout: post
title: "Query 관리 방법"
category: React
date: "2024-11-10 00:00:00"
---

React Query를 처음 쓰면 `queryKey`를 어떻게 관리할지 금방 고민하게 된다. 문자열을 직접 쓰면 오타가 나고, 같은 키를 여러 곳에서 중복 선언하다 보면 무효화(invalidation)도 뒤죽박죽이 된다.

지금 프로젝트에서 쓰는 방법을 정리했다.

## 팩토리 클래스 패턴

`ArticleQueries`처럼 도메인별 static 클래스를 만들고, `queryOptions()`/`infiniteQueryOptions()`를 반환하는 팩토리 메서드를 그 안에 정의한다.

```ts
// entities/article/hooks/ArticleQueries.ts
export default class ArticleQueries {
  private static readonly QueryKeys = {
    all: ["articles"] as const,
    lists: () => [...this.QueryKeys.all, "list"] as const,
    list: (filter?: ArticleFilter) => {
      const { categoryId, keyword, tags, sort } = filter ?? {};
      return [...this.QueryKeys.lists(), { categoryId, keyword, tags, sort }] as const;
    },
    details: () => [...this.QueryKeys.all, "detail"] as const,
    detail: (id: number) => [...this.QueryKeys.details(), id] as const,
    featured: () => [...this.QueryKeys.lists(), "featured"] as const,
  } as const;

  static singleArticleQuery(id: number) {
    return queryOptions<ResponseArticle>({
      queryKey: this.QueryKeys.detail(id),
      queryFn: async () => fetchExtended<ResponseArticle>(`v1/articles/${id}`),
    });
  }

  static infiniteArticleQuery(filter?: ArticleFilter) {
    return infiniteQueryOptions({
      queryKey: this.QueryKeys.list(filter),
      queryFn: async ({ pageParam, queryKey: [_, __, filter] }) => {
        const { categoryId } = filter ?? {};
        return fetchExtended<Page<ResponseArticleThumbnail>>(
          `v1/categories/${categoryId}/articles`,
          { query: { page: pageParam.toString(), size: "20" } }
        );
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.last ? undefined : lastPage.number + 1,
    });
  }
}
```

### 이 패턴의 장점

**1. 쿼리 키가 계층적으로 관리된다.**

```
["articles"]
  └── ["articles", "list"]
        └── ["articles", "list", { categoryId: 1 }]
        └── ["articles", "list", "featured"]
  └── ["articles", "detail"]
        └── ["articles", "detail", 123]
```

게시글을 새로 작성하면 `ArticleQueries.getInvalidationKeys().lists`로 목록 전체를 무효화하고, 특정 게시글만 갱신할 때는 `details`로 해당 항목만 무효화한다.

```ts
static getInvalidationKeys(id?: number) {
  return {
    all: this.QueryKeys.all,
    lists: this.QueryKeys.lists(),
    details: id ? this.QueryKeys.detail(id) : this.QueryKeys.details(),
    featured: this.QueryKeys.featured(),
  };
}
```

**2. `queryOptions()`를 반환하므로 SSR과 CSR에서 같은 정의를 쓴다.**

이게 이 패턴의 가장 큰 이유다. 서버 컴포넌트에서 prefetch하고, 클라이언트 컴포넌트에서 `useSuspenseQuery`로 캐시를 읽을 때, **쿼리 키가 일치해야** 캐시가 활용된다. 팩토리 메서드를 양쪽에서 그대로 호출하면 키 불일치 문제가 원천 차단된다.

## SSR: getDehydratedQuery

서버 컴포넌트에서 데이터를 미리 가져와 클라이언트에 주입하는 유틸리티다.

```ts
// lib/getDehydratedQuery.tsx
export default async function getDehydratedQuery<...>(
  args: FetchQueryOptions<...>
) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(args);       // 서버에서 fetch
  const { queries } = dehydrate(queryClient);  // 직렬화

  const [dehydratedQuery] = queries.filter(
    (query) => query.queryHash === JSON.stringify(args.queryKey)
  );
  return dehydratedQuery;
}
```

서버 컴포넌트에서 이렇게 호출한다.

```tsx
// app/(pages)/article/[categoryId]/[articleId]/page.tsx (Server Component)
export default async function ArticlePage({ params }) {
  const query = await getDehydratedQuery(
    ArticleQueries.singleArticleQuery(Number(params.articleId))
  );

  return (
    <Hydration queries={[query]}>
      <ArticleDetailContainer articleId={Number(params.articleId)} />
    </Hydration>
  );
}
```

클라이언트 컴포넌트에서는 같은 팩토리 메서드로 캐시를 읽는다.

```tsx
// 클라이언트 컴포넌트 (hooks/useArticle.ts)
export default function useArticle(articleId: number) {
  return useSuspenseQuery(ArticleQueries.singleArticleQuery(articleId));
  //                      ↑ 서버에서 prefetch한 것과 동일한 queryKey
}
```

## Hydration 컴포넌트

`HydrationBoundary`를 얇게 감싼 래퍼다. 서버에서 직렬화한 쿼리 배열을 `queries` prop으로 받아서 클라이언트 QueryClient에 주입한다.

```tsx
// shared/ui/Hydration.tsx
export function Hydration(props: HydrationProps) {
  return (
    <HydrationBoundary
      state={{
        ...props.state,
        queries: props.queries,
        mutations: props.mutations,
      }}
    >
      {props.children}
    </HydrationBoundary>
  );
}
```

여러 쿼리를 동시에 prefetch해서 한 번에 주입하는 것도 가능하다.

```tsx
const [articleQuery, profileQuery] = await Promise.all([
  getDehydratedQuery(ArticleQueries.singleArticleQuery(articleId)),
  getDehydratedQuery(ProfileQueries.profileQuery(userId)),
]);

return (
  <Hydration queries={[articleQuery, profileQuery]}>
    <ArticleDetailContainer ... />
  </Hydration>
);
```

## 정리

| 관심사 | 해결 방법 |
|------|---------|
| 쿼리 키 중복/오타 | 팩토리 클래스의 private `QueryKeys` 객체 |
| 계층적 무효화 | 배열 prefix 구조 + `getInvalidationKeys()` |
| SSR/CSR 키 일치 | 서버·클라이언트 모두 같은 팩토리 메서드 호출 |
| 타입 안전성 | `queryOptions<T>`, `infiniteQueryOptions<T>` |

처음에는 팩토리 클래스가 과하게 느껴질 수 있다. 하지만 쿼리 키가 여러 파일에 흩어지기 시작하면, 정리하는 비용이 처음부터 잘 구조화하는 비용보다 훨씬 크다.
