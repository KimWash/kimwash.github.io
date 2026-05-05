---
layout: post
title: "RN과 WebView, 서로를 알아가는 법: 나만의 브릿지 인터페이스 만들기"
category: React Native
date: "2024-10-20 00:00:00"
---

앱을 만들다 보면 "이 기능은 네이티브로, 저 기능은 웹으로" 하는 선택의 순간이 온다. 스플래시, 알림, 카메라, 블루투스처럼 브라우저에서는 절대 해결이 안 되는 영역이 있고, 그 외의 대부분은 사실 웹으로도 충분하다. 그렇다고 웹만 쓰자니 사용자 경험이 앱에 비해 떨어진다.

그래서 나온 구조가 이렇다. **앱바, 탭바, 라우팅은 네이티브에 위임하고, 각 화면 콘텐츠만 WebView 안의 웹으로 처리하는 것.** 웹을 쓰면서도 앱처럼 느껴지게 만드는 방식이다.

문제는, 이렇게 되면 RN과 WebView 안의 React가 서로 말을 걸 수 있어야 한다. 로그인을 WebView에서 처리했는데 네이티브 단도 그 사실을 알아야 하고, WebView 안에서 누른 버튼이 네이티브 네비게이션을 트리거해야 한다. 이걸 위한 인터페이스를 직접 설계하고 구현했다.

## 뭘 해결하려 했나

세 가지가 핵심이었다.

1. **통합 인증**: WebView와 네이티브 양쪽에서 쓰는 인증 정보(쿠키 등)를 동기화
2. **통합 네비게이션**: WebView 안에서 일어나는 화면 이동 요청을 네이티브 라우터가 처리
3. **데이터 공유**: 네이티브와 WebView, 서로 다른 WebView 간의 상태 공유

## 이벤트 타입 정의

메시지 기반 통신이므로 이벤트 타입을 먼저 정의했다. 현재는 다섯 가지이고, 추후 토스트/다이얼로그 같은 상호작용 창도 추가될 수 있다.

```js
export const MessageEvent = Object.freeze({
  Login: 'login',
  Logout: 'logout',
  Log: 'log',
  Auth: 'auth',
  Navigation: 'navigation'
})
```

## 웹 단 구현

### PlatformResolver: 지금 나를 부른 게 누구야?

WebView 안에서 돌아가는 React 입장에서는 자신을 열어준 게 일반 브라우저인지, 모바일 WebView인지 알 필요가 있다. `navigator.userAgent`를 파싱해서 이를 판단한다.

```js
export const usePlatformResolver = () => {
  const [platform, setPlatform] = useState({});
  const userAgent = navigator.userAgent.toLowerCase()

  useLayoutEffect(() => {
    let os = 'web';
    let isWebView = userAgent.indexOf('inunity_webview') > -1
    if (userAgent.indexOf("android") > -1) os = 'android'
    else if (userAgent.indexOf("ios") > -1) os = 'ios';
    setPlatform({ os, isWebView })
  }, []);

  return platform;
}
```

RN의 WebView 컴포넌트에 `userAgent` prop을 커스터마이징해서 `INUnity_WebView` 같은 식별자를 심어두면, 웹 쪽에서 이를 감지할 수 있다.

### MessageManager: 메시지 수발신 담당

`MessageManager` 클래스가 실질적인 통신을 담당한다. `window.ReactNativeWebView.postMessage`로 RN에 메시지를 보내고, `window.addEventListener`(iOS) 또는 `document.addEventListener`(Android)로 메시지를 수신한다.

```js
export class MessageManager {
  constructor(webViewInstance) {
    this.webViewInstance = webViewInstance;
  }

  sendMessage(messageEvent, value) {
    this.webViewInstance.postMessage(
      JSON.stringify({ event: messageEvent, value })
    )
  }

  onMessageReceived({ data }, listeners) {
    if (!data) return;
    try {
      const message = JSON.parse(data);

      switch (message.event) {
        case MessageEvent.Auth: {
          document.cookie = message.value;
          break;
        }
        case MessageEvent.Log: {
          alert(message.value);
          break;
        }
        default: {
          throw new Error('올바르지 않은 이벤트!')
        }
      }
      listeners[message.event]?.();
      this.sendMessage(MessageEvent.Log, 'ack')
    } catch (e) {
      this.sendMessage(MessageEvent.Log, `[Event Parsing Error] ${e.message}`)
    }
  }
}
```

라이프사이클 관리는 `useMessageManager` 훅이 맡는다. iOS와 Android의 이벤트 타겟이 다르다는 점을 이 훅에서 처리한다.

```js
export const useMessageManager = () => {
  const [messageManager, setMessageManager] = useState(
    new MessageManager(window.ReactNativeWebView)
  );
  const { os, isWebView } = usePlatformResolver();

  useEffect(() => {
    if (!isWebView) return;
    const mgr = new MessageManager(window.ReactNativeWebView);

    if (os === 'ios')
      window.addEventListener('message', (e) => mgr.onMessageReceived(e));
    else if (os === 'android')
      document.addEventListener('message', (e) => mgr.onMessageReceived(e));

    setMessageManager(mgr);

    return () => {
      const target = os === 'ios' ? window : document;
      target.removeEventListener('message', mgr.onMessageReceived);
    }
  }, [isWebView]);

  return messageManager;
}
```

## 앱 단 구현

RN 쪽에서는 `WebView` 컴포넌트에 `onMessage` 핸들러를 붙이고, `useMessageManager` 훅으로 웹 쪽으로 메시지를 보낸다.

```tsx
const webViewRef = useRef<WebView>(null);
const messageManager = useMessageManager(webViewRef);

<WebView
  ref={webViewRef}
  userAgent={`... INUnity_WebView`}
  onMessage={(event) => {
    const message = parseMessage(event.nativeEvent.data);
    handleMessage(message, {
      [MessageEvent.Login]: () => {
        router.push('/list')
      },
      [MessageEvent.Navigation]: () => {
        const navigation = message.value as NavigationEvent;
        router.push({
          pathname: navigation.path as any,
          params: navigation.params as any
        })
      },
    });
  }}
/>
```

`Navigation` 이벤트는 웹 내부에서 발생한 화면 이동 요청을 네이티브 라우터로 처리하는 핵심 부분이다. WebView가 각 화면의 콘텐츠만 담당하게 하려면, 스택 네비게이션 자체는 네이티브에서 관리해야 한다.

## 사용법 요약

### WebView → RN

```js
// 웹에서
const messageManager = useMessageManager();
messageManager.sendMessage(MessageEvent.Login, { userId: 'kimwash' });
```

```tsx
// 네이티브에서 수신
onMessage={(event) => {
  handleMessage(parseMessage(event.nativeEvent.data), {
    [MessageEvent.Login]: () => router.push('/home'),
  });
}}
```

### RN → WebView

```tsx
// 네이티브에서 RN에 저장된 쿠키를 웹에 동기화
messageManager.sendMessage({ event: MessageEvent.Auth, value: cookie });
```

```js
// 웹에서 수신 후 ack 전송
const messageManager = useMessageManager({
  [MessageEvent.Auth]: () => {
    messageManager.sendMessage(MessageEvent.Log, 'Auth Completed!')
  }
});
```

## 마치며

Stack Navigation을 네이티브에 위임하고 WebView를 화면 단위로 쪼개는 구조는 웹뷰 앱에서 자주 쓰이는 패턴이다. 다만 이걸 제대로 구현하려면 Next.js 같은 SSR 프레임워크로 초기 로딩을 최적화하고, BroadcastChannel이나 TanStack Query로 WebView 간 데이터 동기화를 처리하는 것도 함께 고민해야 한다.

이 브릿지 인터페이스는 그 출발점이다. 지금은 다섯 개의 이벤트만 있지만, 토스트, 다이얼로그, 파일 피커 등 네이티브 UI가 필요한 어떤 상호작용이든 이 구조 위에 쌓을 수 있다.
