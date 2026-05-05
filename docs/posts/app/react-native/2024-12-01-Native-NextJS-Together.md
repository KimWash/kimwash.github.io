---
layout: post
title: "네이티브와 Next.js를 하나처럼 만들기"
category: React Native
date: "2024-12-01 00:00:00"
---

RN + WebView 하이브리드 앱의 어려운 점은 "두 세계를 이어붙이는 코드"가 여기저기 튀어나오는 것이다. 분기 처리, 메시지 파싱, 플랫폼 감지... 비즈니스 로직보다 인프라 코드가 많아지면 본말이 전도된다.

이 프로젝트에서는 **추상화 레이어**를 쌓아서 웹 개발자가 WebView 안에서 돌아가고 있다는 사실을 거의 의식하지 않아도 되게 만들었다. 그 구조를 설명한다.

## 레이어 1: 플랫폼 감지 (PlatformProvider)

가장 아래 레이어. UserAgent를 파싱해서 현재 실행 환경이 WebView인지, iOS인지 Android인지를 판별한다.

```ts
// lib/PlatformResolver.ts
export const platformResolver = (userAgent: string): Platform => {
  let os = 'web';
  userAgent = userAgent.toLowerCase();
  const isWebView = userAgent.indexOf('inunity_webview') > -1;
  if (userAgent.indexOf("android") > -1) os = 'android';
  else if (userAgent.indexOf("ios") > -1) os = 'ios';
  return { os, isWebView } as Platform;
};
```

`INUnity_WebView` 식별자는 RN의 `CustomWebView`가 UserAgent에 심어둔다.

```tsx
// inunity-native/components/CustomWebView.tsx
userAgent={`Mozilla/5.0 (${Platform.OS}) AppleWebKit/537.36 ... INUnity_WebView`}
```

그 결과, 서버 컴포넌트(`layout.tsx`)에서도 플랫폼을 알 수 있다.

```tsx
// app/(pages)/layout.tsx (Server Component)
export default function RootLayout({ children }) {
  const ua = userAgent({ headers: headers() }).ua;
  const platform = platformResolver(ua);  // 서버에서 판별

  return (
    <html>
      <body>
        <Providers platform={platform}>{children}</Providers>
      </body>
    </html>
  );
}
```

`PlatformProvider`가 이 값을 Context로 전달하면, 트리 어디서든 `usePlatform()`으로 현재 환경을 알 수 있다.

```ts
// lib/PlatformProvider.tsx
export const usePlatform = () => useContext(PlatformContext);
```

## 레이어 2: 메시지 통신 (MessageContext)

WebView와 RN이 메시지를 주고받는 진입점을 하나로 통일한다.

```tsx
// shared/ui/MessageContext.tsx
export const MessageProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { os, isWebView } = usePlatform();
  const [messageManager, setMessageManager] = useState<MessageManager | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!isWebView) return;

    const manager = new MessageManager(window.ReactNativeWebView);
    setMessageManager(manager);

    const onMessageReceived = (event: MessageEvent) => {
      manager.onMessageReceived(event, {
        [MessageEventType.Navigation]: (data: NavigationEvent) => {
          if (data === -1) router.back();
          else router.replace(data.path, { scroll: false });
        },
        [MessageEventType.Page]: (data) => setPageEvent(data),
      });
    };

    if (os === 'ios') window.addEventListener('message', onMessageReceived);
    else document.addEventListener('message', onMessageReceived as EventListener);

    return () => {
      (os === 'ios' ? window : document).removeEventListener(
        'message', onMessageReceived as EventListener
      );
    };
  }, [isWebView]);

  // 페이지 이동 시마다 테마 컬러를 네이티브에 동기화
  useEffect(() => {
    messageManager?.sendMessage(
      MessageEventType.ThemeColor,
      document.querySelector('meta[name="theme-color"]')?.getAttribute('content')
    );
  }, [messageManager, pathname]);

  return (
    <MessageContext.Provider value={{ messageManager, pageEvent }}>
      {children}
    </MessageContext.Provider>
  );
};
```

`isWebView`가 `false`면 이 이펙트는 아무것도 하지 않는다. 일반 브라우저에서 접근해도 완전히 정상 동작한다.

## 레이어 3: 투명한 라우팅 (useNativeRouter, NativeLink)

이 레이어가 핵심이다. 개발자가 라우팅 코드를 쓸 때 "지금 WebView 안인가?"를 의식하지 않아도 된다.

```ts
// hooks/useNativeRouter.ts
export function useNativeRouter() {
  const router = useRouter();
  const { messageManager } = useMessageManager();
  const { isWebView } = usePlatform();

  const customPush = useCallback(
    (url: string) => {
      if (isWebView)
        messageManager?.sendMessage(MessageEventType.Navigation, { path: url });
      else router.push(url);
    },
    [isWebView, messageManager, router]
  );

  const customBack = useCallback(() => {
    if (isWebView) messageManager?.sendMessage(MessageEventType.Navigation, -1);
    else router.back();
  }, [isWebView, messageManager, router]);

  return { ...router, push: customPush, back: customBack };
}
```

WebView 안이라면 Navigation 메시지를 RN에 보내고, RN의 Expo Router가 실제 네이티브 스택 네비게이션을 처리한다. 브라우저라면 그냥 Next.js router를 쓴다.

`NativeLink`도 마찬가지다.

```tsx
// shared/ui/NativeLink.tsx
export function NativeLink({ href, ...props }: LinkProps) {
  const { messageManager } = useMessageManager();

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      messageManager?.sendMessage(MessageEventType.Navigation, { path: href });
    },
    [href, messageManager]
  );

  return <Link href={href} onClick={handleClick} {...props} />;
}
```

`messageManager`가 없다면(=WebView가 아닌 일반 브라우저라면) `onClick`을 등록해도 `e.preventDefault()` 이후 `sendMessage`가 실행되지 않아 기본 링크처럼 동작한다.

## 레이어 4: 인증 (쿠키 공유)

WebView와 네이티브 앱이 같은 인증 상태를 공유한다. `sharedCookiesEnabled`를 켜면 WebView의 쿠키를 `@react-native-cookies/cookies`로 읽을 수 있다.

```tsx
// app/(tabs)/index.tsx
<WebView
  sharedCookiesEnabled  // 쿠키 공유 활성화
  ...
  onMessage={(event) => {
    handleMessage(parseMessage(event.nativeEvent.data), {
      [MessageEventType.Login]: async () => {
        // 로그인 성공 → WebView 쿠키를 SecureStore에 저장
        const cookies = await AuthManager.getAllCookiesFromManager();
        await AuthManager.saveBulkCookiesToStorage(cookies);
      },
    });
  }}
/>
```

앱 재시작 시 `useCookies`가 SecureStore에서 쿠키를 복원하고, 유효성을 검증한 뒤 WebView에 다시 주입한다.

```ts
// _layout.tsx - authorizeApp()
const cookies = await AuthManager.getAllCookiesFromStorage();  // SecureStore
await checkCookieValidity(`${API_BASE_URL}/auth/test`, cookies);
await AuthManager.setBulkCookiesToManager(cookies);  // WebView에 주입
```

웹 코드는 이 과정을 전혀 모른다. 평소처럼 쿠키를 쓰면 된다.

## 전체 구조

```
Next.js (inunity-web)
  └── PlatformProvider         ← 플랫폼 감지
       └── MessageProvider     ← 통신 채널 확보
            └── 페이지 코드
                 ├── useNativeRouter()  ← 투명한 라우팅
                 └── <NativeLink>       ← 투명한 링크

React Native (inunity-native)
  └── WebViewProvider          ← URL 추적
       └── WebView
            ├── onMessage         ← Navigation, Login, ThemeColor 처리
            └── CustomTabBar     ← WebView URL로 활성 탭 판별
```

웹 코드는 `useNativeRouter().push('/board')`를 호출한다. 브라우저에서는 Next.js 라우터가, 앱에서는 RN 라우터가 처리한다. 웹 개발자는 어디서 실행되는지 알 필요가 없다.

이 구조를 만드는 데 가장 중요한 원칙은 하나였다. **플랫폼 분기는 항상 가장 낮은 레이어에서만.** `usePlatform`, `MessageContext`, `useNativeRouter` 이 세 레이어가 분기를 담당하면, 그 위의 코드는 깨끗하다.
