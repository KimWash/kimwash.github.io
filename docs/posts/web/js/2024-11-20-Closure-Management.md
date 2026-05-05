---
layout: post
title: "클로저 관리 잘하자요"
category: JavaScript
date: "2024-11-20 00:00:00"
---

React에서 `addEventListener`를 다루다 보면 클로저 때문에 당황스러운 버그를 만나게 된다. 직접 겪은 사례와 해결 패턴을 정리했다.

## 버그 1: removeEventListener가 작동 안 할 때

처음 MessageManager를 만들었을 때 cleanup 코드가 있는데도 이벤트 리스너가 제거되지 않는 버그를 겪었다.

```js
// 버그 코드
useEffect(() => {
  const mgr = new MessageManager(window.ReactNativeWebView);

  // 등록: 익명 함수 (새로운 참조)
  if (os === 'ios')
    window.addEventListener('message', (e) => mgr.onMessageReceived(e));

  return () => {
    // 제거: 다른 함수 변수 (또 다른 참조)
    window.removeEventListener('message', onMessageReceived);
  };
}, [isWebView]);
```

`addEventListener`에 넘긴 `(e) => mgr.onMessageReceived(e)`와 `removeEventListener`에 넘긴 `onMessageReceived`는 **다른 함수 참조**다. `removeEventListener`는 참조 동등성으로 리스너를 찾기 때문에, cleanup이 아무 효과가 없다. 이펙트가 재실행될 때마다 리스너가 누적된다.

**수정:**

```js
useEffect(() => {
  const mgr = new MessageManager(window.ReactNativeWebView);

  // 참조를 변수에 저장
  const onMessageReceived = (event) => mgr.onMessageReceived(event);

  if (os === 'ios')
    window.addEventListener('message', onMessageReceived);
  else if (os === 'android')
    document.addEventListener('message', onMessageReceived);

  return () => {
    const target = os === 'ios' ? window : document;
    // 동일한 참조로 제거
    target.removeEventListener('message', onMessageReceived);
  };
}, [isWebView]);
```

리스너를 등록할 때와 제거할 때 **반드시 동일한 함수 참조**를 써야 한다.

## 버그 2: 스테일 클로저

이벤트 핸들러 안에서 최신 상태나 함수를 쓰고 싶은데, 이펙트 실행 시점의 오래된 값이 갇혀 있는 경우다.

```tsx
// MessageContext.tsx
useEffect(() => {
  if (!isWebView) return;

  const manager = new MessageManager(window.ReactNativeWebView);
  
  const onMessageReceived = (event: MessageEvent) => {
    manager.onMessageReceived(event, {
      [MessageEventType.Navigation]: (data: NavigationEvent) => {
        if (data == -1) router.back();
        else router.replace(data.path, { scroll: false });
        // ↑ 이 router는 effect 실행 시점에 캡처된 값
      },
    })
  };

  window.addEventListener('message', onMessageReceived);
  return () => window.removeEventListener('message', onMessageReceived);
}, [isWebView]); // router가 deps에 없다!
```

`router`가 `useEffect` 의존성 배열에 없으면, `router`가 변경돼도 이펙트가 재실행되지 않는다. Next.js의 `useRouter`가 반환하는 객체는 안정적(stable)이어서 실제로 문제가 되지는 않지만, 일반적인 상황에서는 스테일 클로저로 이어질 수 있다.

## 올바른 패턴들

### 1. useCallback으로 의존성 명시

deps를 빠짐없이 선언하면 값이 바뀔 때 함수가 새로 만들어지고, 이펙트가 재실행된다.

```ts
// hooks/useNativeRouter.ts
const customPush = useCallback(
  (url: string) => {
    if (isWebView)
      messageManager?.sendMessage(MessageEventType.Navigation, { path: url });
    else router.push(url);
  },
  [isWebView, messageManager, router]  // 모든 deps 명시
);
```

### 2. useRef로 항상 최신값 참조

리스너를 한 번만 등록하되, 핸들러는 항상 최신 버전을 쓰게 하려면 ref를 활용한다.

```tsx
function useStableMessageHandler(handler: (event: MessageEvent) => void) {
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]); // handler 최신값을 ref에 계속 동기화

  useEffect(() => {
    // 이 리스너는 마운트 시 한 번만 등록됨
    const listener = (e: MessageEvent) => handlerRef.current(e);
    window.addEventListener('message', listener);
    return () => window.removeEventListener('message', listener);
  }, []); // deps 없음 - 리스너는 안정적
}
```

`handlerRef.current`를 통해 호출하므로, 핸들러 내부에서 쓰는 상태가 바뀌어도 리스너를 재등록할 필요가 없다.

### 3. 이벤트 위임으로 리스너 수 줄이기

메시지 이벤트처럼 단일 진입점이 있는 경우, 여러 핸들러를 따로 등록하는 대신 하나의 리스너가 분기 처리하면 cleanup도 단순해진다.

```ts
// 분기 처리를 MessageManager에 위임
manager.onMessageReceived(event, {
  [MessageEventType.Navigation]: (data) => { ... },
  [MessageEventType.Auth]: (data) => { ... },
  [MessageEventType.Page]: (data) => { ... },
});
```

이렇게 하면 등록/해제할 리스너는 항상 하나이고, 핸들러 추가/제거가 이벤트 리스너 재등록 없이 가능하다.

## 체크리스트

- [ ] `addEventListener`와 `removeEventListener`에 같은 참조를 쓰고 있는가?
- [ ] `useEffect` deps 배열에 핸들러 안에서 쓰는 값이 모두 들어 있는가?
- [ ] deps가 너무 자주 바뀐다면 `useRef`로 안정화할 수 있는가?
- [ ] 같은 이벤트에 리스너를 여러 번 등록하지는 않는가?

클로저 버그는 대부분 "등록과 제거의 참조 불일치" 또는 "캡처된 값이 오래됨" 두 가지 중 하나다. 이 두 가지를 항상 의심하면 웬만한 문제는 금방 찾을 수 있다.
