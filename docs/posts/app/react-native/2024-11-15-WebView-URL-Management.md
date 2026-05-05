---
layout: post
title: "WebView URL 관리법"
category: React Native
date: "2024-11-15 00:00:00"
---

RN + WebView 하이브리드 앱을 만들다 보면 이런 상황이 생긴다.

> 네이티브 탭바가 있다. 사용자가 WebView 안에서 이리저리 탐색한다. 지금 어느 탭에 있는지를 탭바에 표시해야 한다.

문제는 네이티브 탭바가 WebView 안에서 일어나는 URL 변경을 모른다는 것이다. WebView는 그냥 화면 하나를 보여주는 뷰일 뿐이다.

이 문제를 어떻게 해결했는지 설명한다.

## 핵심 아이디어: URL을 Context에서 추적한다

WebView의 현재 URL을 React Context에 저장해두고, 네이티브 컴포넌트들이 이 값을 구독하게 한다.

```ts
// components/useWebView.tsx
export const webViewOrigin = process.env.EXPO_PUBLIC_WEB_URL ?? "http://localhost:3000/";

export const WebViewProvider = ({ children }: PropsWithChildren) => {
  const [webViews, setWebViews] = useState({ index: webViewOrigin });
  const webViewRefs = useRef<Record<string, WebView | null>>({});

  const setUrl = (webViewId: string, url: string) => {
    setWebViews((prev) => ({ ...prev, [webViewId]: url }));
  };

  return (
    <WebViewContext.Provider value={{ webViewRefs, webViews, setUrl, ... }}>
      {children}
    </WebViewContext.Provider>
  );
};
```

WebView ID를 키로 URL을 관리하는 이유는, 탭마다 별도의 WebView를 둘 수 있기 때문이다. 지금은 `"index"` 하나지만 구조 자체는 여러 WebView를 수용한다.

## WebView에서 URL 업데이트

`onNavigationStateChange` 콜백이 WebView 안에서 페이지 이동이 발생할 때마다 호출된다. 여기서 Context의 URL을 업데이트한다.

```tsx
// app/(tabs)/index.tsx
export default function Index() {
  const { webViewRefs, setUrl } = useWebViewWithId("index");

  return (
    <WebView
      ref={(node) => { webViewRefs.current["index"] = node; }}
      source={{ uri: webViewOrigin }}
      onNavigationStateChange={({ url }) => {
        setUrl(url);  // Context URL 업데이트
      }}
      sharedCookiesEnabled
      userAgent={`... INUnity_WebView`}
      ...
    />
  );
}
```

`setUrl`이 호출되면 `webViews["index"]`가 새 URL로 갱신되고, 이 Context를 구독하는 모든 컴포넌트가 리렌더된다.

## CustomTabBar에서 현재 탭 판별

탭바는 Context에서 현재 WebView URL을 읽어서, 각 탭의 `pathname`과 비교해 활성 탭을 결정한다.

```tsx
// app/(tabs)/_layout.tsx
const CustomTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const webView = useWebViewWithId("index");

  return (
    <View style={{ flexDirection: "row", ... }}>
      {state.routes.map((route, index) => {
        const pathname = (route.params as { pathname?: string }).pathname;
        const webViewPathName = new URL(webView.webViews["index"]).pathname;

        const isFocused = isCurrentRoute(pathname!, webViewPathName);

        const onPress = () => {
          if (!isFocused) {
            messageManager.sendMessage({
              event: MessageEventType.Navigation,
              value: { path: pathname } as NavigationEvent,
            });
          }
        };

        return (
          <TouchableOpacity key={index} onPress={onPress} ...>
            {options.tabBarIcon?.({ focused: isFocused, color: "", size: 24 })}
            <Text style={{ color: isFocused ? "#185bec" : "#222" }}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
```

탭을 눌렀을 때 네이티브 라우팅을 하지 않고, WebView로 Navigation 메시지를 보낸다는 점이 중요하다. 라우팅의 주도권이 WebView 안의 Next.js에게 있다.

## 경로 비교 함수

단순 일치가 아니라 서브경로도 처리해야 한다. `/board`를 눌렀을 때 `/board/1234` 경로에 있어도 게시판 탭이 활성화되어야 한다.

```ts
function isCurrentRoute(basePath: string, currentPath: string): boolean {
  const normalizedBasePath = basePath.replace(/\/$/, "");
  const normalizedCurrentPath = currentPath.replace(/\/$/, "");

  if (normalizedBasePath === "" && normalizedCurrentPath !== "") return false;

  return (
    normalizedCurrentPath === normalizedBasePath ||
    normalizedCurrentPath.startsWith(normalizedBasePath + "/")
  );
}
```

## 탭별 pathname 등록

각 탭 스크린에 `initialParams`로 `pathname`을 넘긴다. 탭바는 이 값을 읽어서 URL 비교에 쓴다.

```tsx
<Tabs tabBar={(props) => <CustomTabBar {...props} />}>
  <Tabs.Screen
    name="index"
    options={{ title: "홈", ... }}
    initialParams={{ pathname: "/" }}
  />
  <Tabs.Screen
    name="board"
    options={{ title: "게시판", ... }}
    initialParams={{ pathname: "/board" }}
  />
  <Tabs.Screen
    name="my"
    options={{ title: "마이페이지", ... }}
    initialParams={{ pathname: "/my" }}
  />
</Tabs>
```

## 전체 흐름 정리

```
사용자가 WebView 안에서 /board/123 으로 이동
  ↓
onNavigationStateChange 호출
  ↓
setUrl("index", "http://...inunity.club/board/123")
  ↓
WebViewContext 업데이트 → CustomTabBar 리렌더
  ↓
isCurrentRoute("/board", "/board/123") === true
  ↓
게시판 탭 활성화
```

```
사용자가 탭바에서 홈 탭을 누름
  ↓
CustomTabBar의 onPress 실행
  ↓
messageManager.sendMessage(Navigation, { path: "/" })
  ↓
WebView 안의 Next.js router가 "/" 로 이동
  ↓
onNavigationStateChange → Context URL 갱신
```

환경 변수 `EXPO_PUBLIC_WEB_URL`로 개발/운영 환경을 전환하는 것도 이 구조 덕분에 한 줄로 끝난다.

```ts
// components/useWebView.tsx
export const webViewOrigin =
  process.env.EXPO_PUBLIC_WEB_URL ?? "http://localhost:3000/";
```
