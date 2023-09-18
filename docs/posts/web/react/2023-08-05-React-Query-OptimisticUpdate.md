---
layout: post
title: "리액트 쿼리로 낙관적 업데이트 수행하기"
category: React
date: "2023-08-05 19:30:00"
---

<img src="@image/2023-08-05/react-query-logo.png">

### 문제 상황

> “댓글 수정/삭제/신고 후에 데이터를 모두 다시 불러오지 않고 갱신시켜야 해요”
> 

React 프로젝트에서 이미 구현돼있는 댓글에 수정/삭제/신고를 수행해도 게시글의 내용을 다시 불러오지 않게 하고 싶다는 요구사항이 있었다. 사실 상용 서비스에서는 어떻게 보면 당연한 요구사항이다. 그냥 해당 댓글의 데이터만 바꾸면 리액트가 알아서 변경사항을 감지해서 리렌더 하겠지만 댓글에 Infinite loading까지 적용해야 하는 복잡한 상황에서 React-Query의 도입을 고민해 볼 수 밖에 없었다.

### Optimistic Update?

mutation을 수행하기 전에 mutation이 성공할 것으로 가정하고 결과로 예상되는 값으로 미리 업데이트해두는 것. 수행하고 나면 query가 캐시에 의존해 작동하는 stale 상태가 된다.

### 그냥 queryData를 set 해주자

Optimistic Update를 수행하는 방법은 단순히 성공하고 나서 UI에 반영 될 것으로 예상되는 데이터를 쿼리 데이터로 set 해주면 된다.

```jsx
const commentQueryKey = "comments"
// fetchComments는 댓글의 리스트를 반환한다.
const query = useQuery(commentQueryKey, commentApi.editComment);
const commentMutation = useMutation(commentApi.editComment, {
	onMutate: ({id, content}) => {
		// 기존 데이터를 queryKey를 이용해 가져온 다음
		const oldData = queryClient.getQueryData(commentQueryKey);
		// 기존 데이터에서 id가 같은 것의 데이터를 변경한다.
		const newData = oldData.map(comment => comment.id === id ? ({...comment, content}) : comment)
		// 새로운 데이터를 query data로 업데이트한다.
		queryClient.setQueryData(commentQueryKey, newData);
	}
})
const queryClient = useQueryClient();

const onCommentEdited = (id, content) => commentMutation.mutate({id, content}) 
```

### 문제점

그런데, 이렇게 하게 되면 순간 업데이트 한 데이터로 변경되긴 하지만 이내 원래 데이터로 돌아오게 된다. 이 원인에 대해서는 아래 블로그에서 아주 상세하게 설명한다. 

[react-query optimistic update시 데이터 꼬임 방지](https://velog.io/@mskwon/react-query-cancel-queries)

간단하게 설명하자면, remount로 인해 mutation 수행 도중 refetching이 일어나고, mutation 수행 도중 refetching 된 데이터는 이전의 데이터이므로 이전의 데이터로 덮어 씌워지게 되는 것이다.

그런데 이해가 잘 가지 않았다. `mutation.mutate` 를 호출한다고 해서 왜 remount가 일어나는 것일까?

사실 이유는 단순하다. 리액트 쿼리의 코드를 뒤져보다가 깨닳을 수 있었다. 

무언가 remount를 시키는 요소를 찾을 수 있지 않을까 해서 mutate의 콜스택을 따라가 보았다. mutate → Mutation.addObserver → notify → onSuccess/onSettled/onError 인 것인데, 생각해보면 mutation의 상태가 변하면 remount가 일어나고, mutation에 의존적이지 않은 query 훅은 remount를 인식하는 것이 당연했다. (..) 

어쨌든 결론은 refetch가 일어난다는 것이고, 이를 막아줘야 한다는 것이다. 

![Screen-Recording-2023-08-04-at-13.47.44.gif](@image/2023-08-05/lifecycle.gif)

### 그냥 cancel 시켜주면 됩니다.

사실 원인을 너무 장황하게 풀어썼지만, 그냥 캔슬 시켜주면 되는 문제다.

```jsx
const commentQueryKey = "comments"
// fetchComments는 댓글의 리스트를 반환한다.
const query = useQuery(commentQueryKey, commentApi.editComment);
const commentMutation = useMutation(commentApi.editComment, {
	onMutate: ({id, content}) => {
		// 우선 기존의 쿼리를 Cancel 시켜줍니다. 
		**queryClient.cancelQueries(commentQueryKey)**
		// 기존 데이터를 queryKey를 이용해 가져온 다음
		const oldData = queryClient.getQueryData(commentQueryKey);
		// 기존 데이터에서 id가 같은 것의 데이터를 변경한다.
		const newData = oldData.map(comment => comment.id === id ? ({...comment, content}) : comment)
		// 새로운 데이터를 query data로 업데이트한다.
		queryClient.setQueryData(commentQueryKey, newData);
		return {previousData, newData}
	}
})
const queryClient = useQueryClient();

const onCommentEdited = (id, content) => commentMutation.mutate({id, content}) 

```

### 사후 처리

1. 성공/실패 여부 관계 없이 서버에서 새로 갖고 오기

```jsx
const commentMutation = useMutation(commentApi.editComment, {
	onMutate: ({id, content}) => {
		...
	},
	// mutation이 성공하든 실패하든 비동기 작업이 끝나면
	onSettled: () => {
		// 쿼리의 캐시를 날리고 새로운 서버 데이터를 갖고 오게 한다.
		queryClient.invalidateQueries(commentQueryKey);
	},
})
```

1. 에러 발생 시에만 롤백하기

성공 시에는 Optimistic Update 한 대로 두거나 필요한 로직을 수행하면서  에러가 발생하면 롤백을 시도한다.

```jsx
const commentMutation = useMutation(commentApi.editComment, {
	onMutate: ({id, content}) => {
		...
	},
	onSuccess: () => {
		alert("댓글을 수정했습니다.");
	},
	// mutation이 성공하든 실패하든 비동기 작업이 끝나면
	onError: (err, newComment, context) => {
		// context에 담고 있는 previousData로 롤백!
		queryClient.setQueryData(
      context.previousData
    )
	}
})
```

### 참고 문서

[[React Query] 리액트 쿼리 useMutation 실용 편(custom hook 으로 사용해보자)](https://velog.io/@kimhyo_0218/React-Query-리액트-쿼리-useMutation-실용-편custom-hook-으로-사용해보자)