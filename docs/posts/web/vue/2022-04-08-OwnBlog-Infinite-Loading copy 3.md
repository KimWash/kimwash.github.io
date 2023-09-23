---
layout: post
title: "블로그 자체개발하기 - SSR과 무한스크롤"
category: 블로그자체개발
date: "2022-04-08"
---

### 이런짓 하지 마세요
프론트엔드 개발자라면 응당 블로그는 스스로 개발할 수 있어야지! 라며 시작하게 된 블로그 자체 개발. 하지만 이 글을 읽는 분들께는 그냥 Velog 등 이미 잘 만들어진 블로그를 사용하는 것을 추천드리고 싶다. 생각보다 글 쓰는 것 이외에도 할 일이 많아지기 때문이다.

### 글을 많이 쓰다보니..
생각보다 글이 많아지니 카테고리별로 글을 보는 기능, 그리고 처음부터 모든 내용을 보여주지 않고 스크롤에 따라 보여주는 기능이 필요하다고 생각하게 되었다. 물론 API에서 데이터를 불러오는 것이 아니기 때문에 엄청나게 요구되는 것은 아니지만, Vuepress는 SSR이기때문에 데이터를 파편적으로 불러올 수도 있을 것 같다는 바보같은 생각에 기초해 시작하게 되었다. 글 파일은 이미 로드 되어 있고 거기서 배열을 가져오는 것이기 때문에 퍼포먼스 상의 차이는 거의 없고 오히려 모듈 로드 때문에 무거워지기만 할 뿐이다. 하지만 vue-infinite-loading 적용 연습 겸 시도해봤다.

### SSR?
SSR(Server Side Rendering)은 말 그대로 서버에서 페이지를 렌더링하는 기술이다. 완전하게 만들어진 HTML을 받아와 렌더링하는 것 이기 때문에 초기 로딩이 빠르고, 로딩 시에 JS 파일을 받아오게 된다.

### 아니 왜이래요
개발서버에선 분명 잘 됐는데 빌드를 시도해보니 문제가 발생했다.
document.title = this.$title; 에서 document is undefind라고 하는 것이다. 그래서 골머리를 좀 앓았는데, 관련 키워드로 검색해보니 SSR 관련 오류라고 하는데, SSR에 대해 개념 정도만 알고 있어서 원인 찾기가 좀 힘들었다.

### created에서는 DOM에 접근하지 말자
Vue의 LifeCycle 중 created에서 DOM에 접근하면 에러가 발생한다. 왜냐하면 created 단계에선 마운트가 시작되지 않았기 떄문에 Virtual DOM을 사용할 수 없기 때문이다. 그래서 mounted에서 route query의 페이지 수를 뽑아오고, vue-infinite-loading를 import해 컴포넌트 로딩도 이뤄지게 했다.

### SSR 찍먹 해봤는데.. 굳이?
아직까진 솔직히 SSR에 대한 장점이 CSR보다 큰지를 모르겠다. 물론 프로젝트 크기가 커지면 SSR을 이용해 멀티 페이지로 가는 것이 옳겠지만, 지금은 SPA로 CSR이 되게 하는 편이 더 나은 것 같다.