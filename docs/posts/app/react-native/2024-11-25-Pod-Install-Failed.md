---
layout: post
title: "어느날 갑자기 pod install 이 안된다"
category: React Native
date: "2024-11-25 00:00:00"
---

분명 어제까지 됐는데 오늘 `pod install`이 안 된다. Expo 프로젝트를 하다 보면 꼭 한 번씩 겪는 일이다. 원인은 다양하지만, 겪었던 패턴들을 모아봤다.

## 우리 프로젝트 환경

- Expo SDK 51
- React Native 0.74.5
- `@react-native-firebase/app` `@react-native-firebase/messaging`
- `@react-native-cookies/cookies`

이 스택이면 아래 케이스들을 특히 주의해야 한다.

## Case 1: node를 못 찾는다

Expo의 `Podfile`은 `node --print "require.resolve(...)"` 형태로 패키지 경로를 동적으로 찾는다.

```ruby
require File.join(
  File.dirname(`node --print "require.resolve('expo/package.json')"`),
  "scripts/autolinking"
)
```

셸 세션에 따라 `node`가 PATH에 없는 경우가 있다. nvm이나 volta로 Node를 관리한다면 `~/.zshrc`의 초기화 스크립트가 CocoaPods 실행 시 로드되지 않을 수 있다.

**해결:**

```bash
# nvm을 쓴다면 ~/.zshrc 에
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

또는 심볼릭 링크로 node를 `/usr/local/bin`에 연결한다.

```bash
sudo ln -sf $(which node) /usr/local/bin/node
```

## Case 2: Ruby/Bundler 버전 불일치

CocoaPods는 Ruby gem이다. 시스템 Ruby를 쓰다가 rbenv/rvm을 도입했거나, macOS 업데이트 이후 Ruby 버전이 바뀌면 gem 환경이 달라진다.

```
[!] CocoaPods requires your terminal to be using UTF-8 encoding.
```
또는
```
bundler: command not found: pod
```

**해결:**

```bash
# rbenv로 Ruby 버전 고정
rbenv install 3.2.2
rbenv local 3.2.2

# bundler 재설치
gem install bundler
bundle install

# 이후 항상 bundler로 pod 실행
bundle exec pod install
```

`Gemfile`이 프로젝트에 있다면 `bundle exec pod install`을 쓰는 게 안전하다. gem 버전이 Gemfile.lock에 고정되어 환경 차이로 인한 문제를 줄여준다.

## Case 3: Apple Silicon에서 아키텍처 문제

M1/M2 맥에서 x86_64 전용 pod가 있을 경우 컴파일에 실패한다. Firebase 관련 pod가 특히 이 문제를 자주 일으켰다.

```
# Rosetta 에뮬레이션으로 pod install
arch -x86_64 pod install
```

하지만 이건 임시방편이다. 근본적인 해결책은 의존성 라이브러리가 arm64를 지원할 때까지 기다리거나, `Podfile`에 exclusion을 추가하는 것이다.

```ruby
post_install do |installer|
  installer.pods_project.build_configurations.each do |config|
    config.build_settings["EXCLUDED_ARCHS[sdk=iphonesimulator*]"] = "arm64"
  end
end
```

Expo 51 + React Native 0.74 기준으로는 대부분의 주요 라이브러리가 arm64를 지원해서 이 문제가 줄었다.

## Case 4: expo prebuild를 안 했다

`ios/` 폴더가 없거나 오래된 상태에서 `pod install`을 하면 실패한다.

```bash
# ios/ 폴더를 새로 생성
npx expo prebuild --clean
```

`--clean`은 기존 `ios/`와 `android/` 폴더를 지우고 다시 생성한다. `app.json`의 플러그인 설정이 반영된 깨끗한 상태로 시작할 수 있다.

의존성을 추가하거나 `app.json`의 `plugins` 설정을 바꿨다면 반드시 `prebuild`를 다시 해야 한다.

## Case 5: Podfile.lock 충돌

`Podfile.lock`이 현재 `Podfile`과 맞지 않으면 이런 메시지가 나온다.

```
[!] `<PodfileError>` is not compatible with `...`
```

`Podfile.lock`을 지우고 다시 설치하면 된다.

```bash
rm ios/Podfile.lock
cd ios && pod install
```

단, `Podfile.lock`은 팀원 간 의존성 버전을 고정하는 역할도 하므로, git에 커밋하는 것을 권장한다. 로컬에서만 지우고 재생성한 뒤, 변경 내용이 의도한 것인지 확인하고 커밋하자.

## Case 6: Firebase 설치 후 pod install 실패

`@react-native-firebase`는 `GoogleService-Info.plist` 파일이 있어야 한다. 이 파일 없이 pod install을 하면 빌드 단계에서 실패한다.

Firebase 콘솔에서 plist 파일을 다운로드해서 `ios/` 안에 넣고, `app.json`의 `googleServicesFile` 경로를 맞춰줘야 한다.

```json
// app.json
{
  "expo": {
    "plugins": [
      "@react-native-firebase/app",
      ["@react-native-firebase/messaging", { ... }]
    ],
    "ios": {
      "googleServicesFile": "./GoogleService-Info.plist"
    }
  }
}
```

이후 `expo prebuild`와 `pod install`을 순서대로 실행한다.

## 빠른 진단 흐름

```
pod install 실패
  ├─ "node not found" → Case 1 (node PATH)
  ├─ "bundler" / Ruby 관련 → Case 2 (Ruby/Bundler)
  ├─ "arm64" / "x86_64" → Case 3 (Apple Silicon)
  ├─ ios/ 폴더 없음 → Case 4 (expo prebuild)
  ├─ "not compatible" → Case 5 (Podfile.lock)
  └─ Firebase 관련 → Case 6 (GoogleService-Info.plist)
```

대부분은 `expo prebuild --clean && pod install` 조합으로 해결된다. 이게 안 된다면 에러 메시지를 천천히 읽으면서 위 케이스 중 어디에 해당하는지 찾아보면 된다.
