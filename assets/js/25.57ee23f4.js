(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{313:function(t,s,a){t.exports=a.p+"assets/img/dll_insert.7b8a3246.gif"},314:function(t,s,a){t.exports=a.p+"assets/img/dll_remove.04f92539.gif"},370:function(t,s,a){"use strict";a.r(s);var n=a(15),e=Object(n.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("ul",[s("li",[s("p",[t._v("하나의 노드가 선행 노드와 후속 노드에 대한 두 개의 링크를 가지는 리스트")])]),t._v(" "),s("li",[s("p",[t._v("선행 노드 참조가 가능")])]),t._v(" "),s("li",[s("p",[t._v("공간을 많이 차지하고 코드가 복잡")])]),t._v(" "),s("li",[s("p",[t._v("헤드 노드: 데이터를 가지지 않고 오직 삽입/삭제 코드를 간단하게 할 목적으로 만들어진 노드")]),t._v(" "),s("ul",[s("li",[t._v("헤드 포인터와 상이")]),t._v(" "),s("li",[t._v("공백 상태에서는 헤드 노드만 존재")])])]),t._v(" "),s("li",[s("p",[t._v("노드 구조")]),t._v(" "),s("div",{staticClass:"language-c line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-c"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("typedef")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" element"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("typedef")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("struct")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("DListNode")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\telement data"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("struct")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("DListNode")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("llink"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("struct")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("DListNode")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("rlink"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" DListNode"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br")])])]),t._v(" "),s("li",[s("p",[t._v("삽입")]),t._v(" "),s("p",[s("img",{attrs:{src:a(313),alt:"ezgif.com-video-to-gif-6.gif"}})]),t._v(" "),s("div",{staticClass:"language-c line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-c"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("dinsert")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("DListNode "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("before"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" element data"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\tDListNode "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("newnode "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("DListNode"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("malloc")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("sizeof")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("DListNode"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("strcpy")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("newnode"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("->")]),t._v("data"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" data"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// newnode->data에 data 복사")]),t._v("\n\tnewnode"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("->")]),t._v("llink "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" before"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("     "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// newnode의 좌우를 각각 기존 노드와 기존 노드의 오론쪽 노드로 지정")]),t._v("\n\tnewnode"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("->")]),t._v("rlink "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" before"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("->")]),t._v("rlink"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\tbefore"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("->")]),t._v("rlink"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("->")]),t._v("llink "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" newnode"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// before->rlink->llink: 기존 노드의 오른쪽 노드의 왼쪽 노드: 원래는 before 겠지만 이젠 newnode!!")]),t._v("\n\tbefore"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("->")]),t._v("rlink "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" newnode"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br"),s("span",{staticClass:"line-number"},[t._v("7")]),s("br"),s("span",{staticClass:"line-number"},[t._v("8")]),s("br")])])]),t._v(" "),s("li",[s("p",[t._v("삭제")]),t._v(" "),s("p",[s("img",{attrs:{src:a(314),alt:"ezgif.com-video-to-gif-7.gif"}})]),t._v(" "),s("div",{staticClass:"language-c line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-c"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("ddelete")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("DListNode "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("head"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" DListNode"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" removed"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("removed "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" head"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 헤드와 지울게 같으면 지울 수 없음.")]),t._v("\n\tremoved"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("->")]),t._v("llink"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("->")]),t._v("rlink "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" removed"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("->")]),t._v("rlink"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// removed의 왼쪽 노드의 오른쪽 노드는 원래 removed였지만 삭제할 것이기 때문에 removed->right로 대체")]),t._v("\n\tremoved"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("->")]),t._v("rlink"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("->")]),t._v("llink "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" removed"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("->")]),t._v("llink"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 윗줄과 마찬가지")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("free")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("removed"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br")])])])])])}),[],!1,null,null,null);s.default=e.exports}}]);