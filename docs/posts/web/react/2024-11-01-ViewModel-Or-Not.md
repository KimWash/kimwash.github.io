---
layout: post
title: "ViewModel 갖다버릴까요"
category: React
date: "2024-11-01 00:00:00"
---

Android를 하다 React로 온 사람이라면 ViewModel을 포기하기 쉽지 않다. 나도 그랬다. React Query를 쓰면서도 화면마다 `useXxxViewModel`을 만들었다.

그게 과연 맞는 선택이었는지 되돌아봤다.

## 우리 ViewModel은 이렇게 생겼다

```ts
// features/board/hooks/usePostDetailViewModel.ts
export default function useArticleDetailViewModel({ articleId }: { articleId: number }) {
  const article = useArticle(articleId);

  const submitComment = useSubmitComment();
  const reportArticle = useReportArticle();
  const reportComment = useReportComment();
  const editComment = useEditComment();
  const deleteArticle = useDeleteArticle();
  const deleteComment = useDeleteComment();

  return {
    article,
    submitComment,
    reportComment,
    reportArticle,
    editComment,
    deleteComment,
    deleteArticle,
  };
}
```

```ts
// features/home/useHomeViewModel.ts
export default function useHomeViewModel() {
  const articles = useFeaturedArticles();
  const notices = useArticles({ categoryId: 1 });
  const notifications = useServerNotification();
  return { articles, notices, notifications };
}
```

보면 알겠지만, 두 ViewModel 모두 로직이 없다. 훅을 호출하고, 결과를 모아서 반환할 뿐이다.

## 이게 의미 있는 추상화인가?

### 의미 있다고 생각하는 이유

**1. 화면의 계약이 명확해진다.**

`useArticleDetailViewModel`의 반환값을 보면 이 화면에서 무슨 데이터가 필요하고 무슨 액션이 가능한지 한눈에 보인다. 새로 합류한 팀원도 ViewModel만 보면 화면 전체를 이해할 수 있다.

**2. 컴포넌트가 얇아진다.**

```tsx
function ArticleDetailContainer({ articleId }: { articleId: number }) {
  const vm = useArticleDetailViewModel({ articleId });

  return (
    <ArticleDetail
      article={vm.article.data}
      onSubmitComment={vm.submitComment.mutate}
      onDeleteArticle={vm.deleteArticle.mutate}
    />
  );
}
```

컨테이너 컴포넌트가 `import`를 7개 하는 대신 1개만 한다. 화면 단위로 무엇을 쓰는지 추적하기 쉽다.

**3. 리팩토링이 한 곳에서 끝난다.**

댓글 제출 로직이 바뀌었을 때, `useSubmitComment`를 교체하면 ViewModel이 알아서 전파한다. 컴포넌트 트리를 뒤질 필요가 없다.

### 의미 없다고 생각하는 이유

**1. React Query 훅은 이미 잘 조합된다.**

```tsx
// ViewModel 없이도 이렇게 쓰면 된다
function ArticleDetailContainer({ articleId }: { articleId: number }) {
  const article = useArticle(articleId);
  const submitComment = useSubmitComment();
  const deleteArticle = useDeleteArticle();
  ...
}
```

훅은 원래 조합하기 위한 것이다. ViewModel 레이어 없이도 컴포넌트에서 직접 조합하면 된다.

**2. 화면 단위가 애매해지면 문제가 생긴다.**

댓글 컴포넌트가 다른 화면으로 이동한다면? ViewModel을 함께 끌고 가야 하는지, 아니면 새로운 ViewModel을 만들어야 하는지 판단이 필요해진다. 훅이 화면에 결합되어 있어서 재사용성이 떨어진다.

**3. 내용 없는 레이어가 비용이다.**

아무 로직 없이 훅을 모아주는 함수에도 파일이 필요하고, 이름이 필요하고, 익숙해지는 시간이 필요하다.

## 결론: 얇게 유지하면 가치 있다

ViewModel이 로직 없이 훅을 모아주는 역할에 머문다면, 그 자체로는 가치가 있다. 화면의 계약을 명확하게 만들고, 진입점을 단일화해준다.

단, 여기에 비즈니스 로직을 쌓기 시작하면 문제가 생긴다. `useHomeViewModel` 안에서 데이터를 가공하거나 상태를 관리하기 시작하면, React Query의 장점인 캐싱과 서버 상태 동기화가 흐릿해진다.

**로직은 entity 훅에, ViewModel은 집합에만.** 이 원칙을 지키는 한 ViewModel은 버리지 않아도 된다.

버려야 할 건 ViewModel이 아니라, ViewModel에 로직을 쌓는 습관이다.
