(window.webpackJsonp=window.webpackJsonp||[]).push([[59],{372:function(e,_,r){"use strict";r.r(_);var v=r(15),t=Object(v.a)({},(function(){var e=this,_=e._self._c;return _("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[_("h3",{attrs:{id:"오류"}},[e._v("오류")]),e._v(" "),_("p",[e._v('CircularQueue에서 "'),_("code",[e._v("q->front = q->rear")]),e._v("를 0이 아닌 1로 주면 "),_("code",[e._v("SIZE - 1")]),e._v('" => "'),_("code",[e._v("q->front = q->rear")]),e._v("를 0이 아닌 1로 줘도 "),_("code",[e._v("SIZE - 1")]),e._v('"')]),e._v(" "),_("h3",{attrs:{id:"deque"}},[e._v("Deque")]),e._v(" "),_("p",[e._v("'덱' 이라고 읽는다. 그냥 Circular Queue에서 앞뒤에서 삽입/삭제가 모두 가능하게 만든 것 뿐이다.")]),e._v(" "),_("h3",{attrs:{id:"포화와-공백상태"}},[e._v("포화와 공백상태")]),e._v(" "),_("p",[e._v("덱은 Circular Queue를 이용해 구현됐기 때문에 원형 큐와 동일하다.")]),e._v(" "),_("h3",{attrs:{id:"삽입"}},[e._v("삽입")]),e._v(" "),_("ul",[_("li",[e._v("add_rear: Circular Queue의 enqueue")]),e._v(" "),_("li",[e._v("add_front: 포화상태가 아니면 "),_("code",[e._v("front")]),e._v("에 데이터 삽입 (첫 요소의 앞으로서 비어있던 곳) 후 front 1 감소")])]),e._v(" "),_("h3",{attrs:{id:"제거"}},[e._v("제거")]),e._v(" "),_("ul",[_("li",[e._v("delete_rear: Circular Queue의 dequeue")]),e._v(" "),_("li",[e._v("delete_front: 공백상태가 아니면 "),_("code",[e._v("front")]),e._v(" 1 증가 후 그 자리의 데이터 반환 (기존의 "),_("code",[e._v("front")]),e._v("는 빈 곳을 가리키고 있었지만, 새로운 "),_("code",[e._v("front")]),e._v("는 이전의 첫 요소를 가리키고 있음.)")])])])}),[],!1,null,null,null);_.default=t.exports}}]);