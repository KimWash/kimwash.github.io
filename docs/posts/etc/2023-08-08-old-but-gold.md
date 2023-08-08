---
layout: post
title: "레거시는 왜 레거시일까 (feat. 욕심)"
category: etc
date: "2023-08-08"
---

<img src="@image/2023-08-08/oldbutgold.png"></img>

노션에 적어만 놓고 글을 안썼다..

나도 레거시 기술에 대한 혐오가 가득한 사람이다. 과거에도 그랬고, 지금도 그렇고, 앞으로도 그럴 것이다.  그런데 레거시에 대한 본질적인 고민을 해본 적은 없다. React, Vue 같은 모던 프론트엔드 프레임워크를 사용하지 않으면 틀딱 취급하지만, 왜 아직도 쓰이는 곳이 꽤나 있는 이유에 대해서는 그저 새로운 것을 배우기 싫어하고 옛것을 사용하고 싶어 하는 보수적인 태도라고 치부했다. 하지만 현업에서 알바를 하면서 레거시에 대한 인식이 크게 바뀌었다. 잘못됐거나 안좋다고 생각하는 것이 있으면 그 이유와 더 나은 방향을 제시할 수 있어야 한다.

이 글은 개발을 어느정도 배운, 특히 React, Vue 등 비교적 최근에 나온 프론트엔드 프레임워크들을 주로 공부했거나 개발을 시작한 사람 중 새로운 기술에 대한 집착이 있는 사람들, 기존의 패러다임에서 벗어난 방식으로 개발을 해보려고 하는 사람들이 읽어보고 의견을 주면 좋을 것 같다. 

### 나에게 레거시란 무엇일까

프론트엔드에서 레거시는 뭘까? 사전적인 정의 말고 실제로 쓰이는 의미에 관한 이야기다. 나는 프론트엔드에서는 바닐라 자바스크립트를 사용하고, webpack을 사용하지 않은 경우, 작업물, 기술을 레거시라고 생각하는 것 같다. 그러나 이 정의는 매우 가변적이고 확장되기 쉬운 것이, TypeScript를 사용하지 않는다고 레거시 취급할 수도 있고 React에서 Redux를 사용하지 않고 Context API를 통해 State를 관리한다고 레거시 취급할 수도 있다.  나에게 레거시란 “최신 기술을 사용하지 않는 행태” 를 넘어서 나의 새로운 기술에 대한 고집이 안먹히는 상황인 것 같다.

### 우리가 사용하는 기술 모두 사실 레거시 기술을 편하게 쓸 수 있게 해준 것 뿐이다

React는 바닐라나 JQuery 환경에서 이뤄지는 DOM 조작을 쉽게 만들어 놓고 데이터바인딩, State 등의 기능을 지원하는 것 뿐이고, Redux는 React에서 난무하는 State를 전역으로 관리하기 위한 솔루션일 뿐인 것이다. 그러니까 결국은 React를 잘하려면 바닐라도 잘해야 하는 것이다. 기업이 바닐라JS로 코딩테스트를 보기도 하는 이유다. 

### 프로젝트를 레거시 기술로 진행한다는데? 그럼 내 맘대로 만들어서 쓸래 😏

처음에는 맘에 들지는 않았다. 하지만 직전에 마무리쯤에 투입된 프로젝트에서 JQuery를 이용한 개발을 했었던 터라 크게 문제 없을 것이라 생각했다. 그렇지만 새로운 프로젝트를 진행할 때는 상황이 달라졌다. 기존에 있던 코드를 참고해서 만드는게 아닌, 내가 만들 수 있는 상황이 됐다. Custom Tag를 선언하고, 그걸 찾아서 원하는 형태로 렌더링 해주는 방식으로 만들고 싶다는 생각이 든 것이다. 이 생각은 가히 재앙을 불러왔다고 해도 과언이 아닐 것 같다.

### 남이 안한 짓은 안한 이유가 있다

처음에는 재미있었다. 마치 내가 프론트엔드 프레임워크를 만드는 것 같았다. 하지만 큰 문제점이 여러가지 있었다. 체크박스, 라디오버튼, 드롭다운을 리스트로 관리할 때 DOM에 함수, 배열 등의 데이터를 어떻게 바인딩할지 부터 시작해서 모듈화를 하고 싶어 번들링을 적용하려니 Spring Boot의 빌드 과정과 합쳐야 하고, 이걸 배포할 때도 적용되게 해야하는 등 현실적으로 어려움이 많았다. 또, 최초 DOM Rendering 당시에는 커스텀 태그만 덩그러니 있으니 중간에 오류로 JS 코드가 중단돼버리면 렌더가 안되는 문제도 있었다. 그냥 총체적 난국이다. 이런 문제에 관해 팀장님과 의논 중 팀장님의 말씀이 머리에 남는다.

> “그런 시도가 없었던건 아니에요, 있었는데.. 남들이 안한데는 다 이유가 있는거에요”
> 

### 코드는 결국 같이 만들고, 관리하는 것이다

내 토이 프로젝트를 개발한다고 하면 어떤 기술스택을 사용하는지, 어떤 코드 스타일을 추구하는지에 있어서 자유로울 것이다. 하지만 현업에서는 많은 사람들과 함께 프로젝트를 진행하고, 내 코드를 다른 사람이 봤을 때 최대한 설명이 필요 없어야 하고, 공통적으로 공유되는 영역 안에서 놀아야 한다. 하지만 나는 코드를 조금 더 깔끔하게 하고, 효율성을 극대화해보겠다는 욕심에 눈이 멀어 내 능력 부족을 고려하지 않고 드라이브를 걸었던 것 같다.