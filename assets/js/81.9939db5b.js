(window.webpackJsonp=window.webpackJsonp||[]).push([[81],{374:function(t,e,a){"use strict";a.r(e);var n=a(15),r=Object(n.a)({},(function(){var t=this,e=t._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("p",[t._v("오늘은 간단하게 짚고 넘어가야할 부분을 적어보고자 한다.")]),t._v(" "),e("p",[t._v("Flutter로 앱 개발을 진행하고, Vue로 대시보드 개발을 진행하는데, 요즘 별로 대시보드를 만질 일이 없어서 JS를 손놓고 있었다. 그런데 API를 일원화하고 다중 학교를 지원하는 과정에서 대시보드의 수정도 불가피해졌고, 대시보드를 수정하는 과정에서 ISODate를 Date 객체로 받으려고 하는데, 이때 삽질을 조금 해서 기록해두려고 한다.")]),t._v(" "),e("h3",{attrs:{id:"date-parse-는-밀리초로-new-date-는-date-객체를-반환한다"}},[t._v("Date.parse()는 밀리초로, new Date()는 Date 객체를 반환한다!")]),t._v(" "),e("p",[t._v("사실 굉장히 초짜스러운 것이긴 하다. 하지만 모든 데이터에 Type Check가 들어가고 VSC에서 설명도 자세하게 뜨는 Flutter와 다르게 JS는 그렇지 못한 부분이 있어서.. 라고 변명해보지만 결국 내 숙련이 부족한 탓이다.")]),t._v(" "),e("p",[t._v("핵심은 이것이다.")]),t._v(" "),e("blockquote",[e("p",[t._v("Date.parse('ISODateString') => millisecondsSinceEpoch\nnew Date('ISODateString') => DateObject")])]),t._v(" "),e("p",[t._v("다음번엔 꼭 이런 짓을 안하기 위해서 적어본다..")])])}),[],!1,null,null,null);e.default=r.exports}}]);