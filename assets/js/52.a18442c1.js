(window.webpackJsonp=window.webpackJsonp||[]).push([[52],{385:function(v,_,l){"use strict";l.r(_);var t=l(15),i=Object(t.a)({},(function(){var v=this,_=v._self._c;return _("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[_("h3",{attrs:{id:"도메인-무결성-제약조건-도메인-제약"}},[v._v("도메인 무결성 제약조건: 도메인 제약")]),v._v(" "),_("p",[v._v("릴레이션 내의 튜플들이 각 속성의 도메인에 지정된 값만을 가져야 한다는 조건")]),v._v(" "),_("ul",[_("li",[v._v("SQL 문에서 type, null/not null, default, check 등을 사용해 지정 가능")])]),v._v(" "),_("h3",{attrs:{id:"개체-무결성-제약조건-기본키-제약"}},[v._v("개체 무결성 제약조건: 기본키 제약")]),v._v(" "),_("p",[v._v("기본키에 따르는 무결성 원칙")]),v._v(" "),_("ul",[_("li",[v._v("기본키는 NULL이면 안되고, 릴레이션 내에 오직 하나의 값만 존재해야 함.\n"),_("ul",[_("li",[v._v("삽입: 중복 삽입 금지")]),v._v(" "),_("li",[v._v("수정: 기본키 값이 같은, 혹은 NULL인 경우 수정 금지")])])])]),v._v(" "),_("h3",{attrs:{id:"참조-무결성-제약조건-외래키-제약"}},[v._v("참조 무결성 제약조건: 외래키 제약")]),v._v(" "),_("p",[v._v("릴레이션 간의 참조 관계를 선언하는 제약조건")]),v._v(" "),_("ul",[_("li",[v._v("자식 릴레이션의 외래키는 부모 릴레이션의 기본키와 도메인이 동일")]),v._v(" "),_("li",[v._v("자식 릴레이션의 값이 변경될 때 부모 릴레이션이 제약을 받음")]),v._v(" "),_("li",[v._v("NULL이라고 해서 참조 무결성 제약조건을 위반하는 것은 X\n"),_("ul",[_("li",[_("p",[v._v("삭제")]),v._v(" "),_("p",[v._v("참조하는 테이블을 같이 삭제할 수 없어서 아래 중 하나의 작업을 수행하게 선언 필요")]),v._v(" "),_("ul",[_("li",[v._v("즉시 작업 중지")]),v._v(" "),_("li",[v._v("자식 릴레이션의 관련 튜플 삭제")]),v._v(" "),_("li",[v._v("초기에 설정된 다른 어떤 값으로 변경")]),v._v(" "),_("li",[v._v("NULL으로 설정")])])]),v._v(" "),_("li",[_("p",[v._v("수정")]),v._v(" "),_("ul",[_("li",[v._v("삭제/삽입 연상르 연속해서 수행")]),v._v(" "),_("li",[v._v("부모 릴레이션의 수정->옵션에 따라 처리 후 문제 없으면 제약 조건에 따라 처리")])])])])])])])}),[],!1,null,null,null);_.default=i.exports}}]);