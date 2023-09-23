---
layout:  post
title:  H4Pay 개발기 - vue-cropperjs에서 웹 이미지 로드하기(refs가 undefined일 때)
category:  H4Pay
date:  "2022-02-02"
---

### 발단
관리도구에서 사진을 변경할 때 크롭을 하는데, 이때 vue-cropperjs를 사용한다. Component를 template에 렌더시키고 여기에 refs를 엮어서 관리하는 형태의 라이브러리인데, 이미 있는 이벤트 정보를 수정할 때 웹 URL로 이미지를 불러오게 하려 하니 refs가 undefined라는 것이다. 파일을 선택하면 setImage 함수를 호출하게 해놓았는데, 해당 함수를 호출해보아도 마찬가지였다. 무엇이 문제일까 머리를 싸매던 도중 'vue refs undefined'라고 검색해보고는 실마리를 잡았다.

### 문제의 핵심, 렌더
refs는 렌더가 됐을때**만** 사용가능하고, 렌더 전에는 사용 불가능하단 것이 특징이었다. upload component의 v-model로 잡아놓은 selectedFile 변수가 null인지를 v-if에서 검사하는데, 이런 경우 아예 렌더링되지 않아 refs를 사용할 수 없다. 그래서 v-show로 바꿔 렌더는 되지만 보이지 않게 해야 한다고 한다.

### 그래도 안 뜨는데?
근데 그래도 뜨지 않는 것이다. 문제의 본질을 생각해보았다. 결국 렌더가 되지 않은 것이 문제기 때문에 mount된 후에 이미지를 설정하는 함수를 호출해보기로 했고, 그러자 해결됐다.

### 해결은 된 것 같지만..
뭔가 미덥지 않아 Vue Lifecycle에 대한 공식 문서를 읽어봤다. "mounted는 모든 자식 컴포넌트가 마운트되었음을 보장하지 않"고, "전체 화면내용이 렌더링될 때까지 기다리려면, mounted 내에서 vm.$nextTick를 사용"해야한다고 한다. 그래서 그대로 따라서 조금 더 잘 작동하게끔 했다.

### LifeCycle, 놓치기 쉽지만 중요한 것
앱이든 웹이든 프로트엔드 개발을 하다 보면 라이프사이클은 생각보다도 더 중요하다. 라이프사이클을 염두에 두지 않고 무작정 개발을 하게 되면 꼬이기 쉽상이다. 오늘도 다시 중요성을 떠올리게 해준 크로퍼 라이브러리에게 감사한 마음을 가져본다.