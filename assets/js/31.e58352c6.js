(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{309:function(t,s,a){t.exports=a.p+"assets/img/lin_queue.c2a46bc9.gif"},375:function(t,s,a){"use strict";a.r(s);var n=a(15),e=Object(n.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h3",{attrs:{id:"시작하기-앞서"}},[t._v("시작하기 앞서")]),t._v(" "),s("p",[t._v("저번 Queue 글에 포함된 코드에 오류가 있더라고요. 제 글로 시험공부를 하는 바보같은 분들은 없으시겠죠? 큐가 빈 상태에서 enqueue를 하면 front와 rear를 모두 새로운 노드의 주소로 지정해야 한답니다.")]),t._v(" "),s("h3",{attrs:{id:"linear-queue의-단점"}},[t._v("Linear Queue의 단점")]),t._v(" "),s("p",[t._v("Linear Queue의 경우에는 1차원 배열로 구현한 경우에 새로운 요소를 rear를 shifting 하면서 삽입하기 때문에 삽입 가능한 최대 크기까지 삽입하면 삭제한 요소들을 인덱스 0부터 시작하게 shift 해줘야한다.")]),t._v(" "),s("img",{attrs:{src:a(309)}}),t._v(" "),s("h3",{attrs:{id:"circular-queue"}},[t._v("Circular Queue")]),t._v(" "),s("p",[t._v("이러한 단점을 보완하고자 Queue를 원형으로 만들었다. 원형으로 만들었기 때문에 기존에 선형으로 만들었을 때 생기는 문제를 해결할 수 있었다.")]),t._v(" "),s("p",[t._v("기본적으로 Linear Queue의 구조를 그대로 가져오되 그걸 원형으로 구부려놨다고 보면 된다.")]),t._v(" "),s("ul",[s("li",[t._v("front: 첫번째 요소 하나 앞의 인덱스")]),t._v(" "),s("li",[t._v("rear: 마지막 요소의 인덱스")])]),t._v(" "),s("h3",{attrs:{id:"포화와-공백상태"}},[t._v("포화와 공백상태")]),t._v(" "),s("ul",[s("li",[t._v("공백상태는 Lienar Queue와 마찬가지로 front == rear 이지만 NULL은 아닌 상태다.")]),t._v(" "),s("li",[t._v("포화상태는 "),s("code",[t._v("front % SIZE == (rear + 1) % SIZE")]),t._v(" 으로 정의된다.\n"),s("ul",[s("li",[t._v("(rear + 1) % SIZE 를 이용해 맨 뒤 요소의 바로 다음 요소가 front와 일치하는지 확인하므로, "),s("code",[t._v("(front - 1) % SIZE == rear % SIZE")]),t._v(" 도 동작할 것이다.")]),t._v(" "),s("li",[t._v("이런 방식으로 인덱스를 달리해서 문제가 출제되기 좋다.")])])]),t._v(" "),s("li",[t._v("Queue를 Initialize 할 때 "),s("code",[t._v("q->front = q->rear")]),t._v("를 0이 아닌 1로 줘도 "),s("code",[t._v("SIZE - 1")]),t._v(" 만큼의 가용한 공간을 갖게 된다.")])]),t._v(" "),s("div",{staticClass:"language-C line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-c"}},[s("code",[s("span",{pre:!0,attrs:{class:"token macro property"}},[s("span",{pre:!0,attrs:{class:"token directive-hash"}},[t._v("#")]),s("span",{pre:!0,attrs:{class:"token directive keyword"}},[t._v("define")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token macro-name"}},[t._v("SIZE")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token expression"}},[s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")])])]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("init_queue")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("QueueType "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("q"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  q"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("->")]),t._v("front "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" q"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("->")]),t._v("rear "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("is_full")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("QueueType "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("q"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" q"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("->")]),t._v("front "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("%")]),t._v(" SIZE "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("rear "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("%")]),t._v(" SIZE"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("is_empty")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("QeueueType "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("q"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" q"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("->")]),t._v("front "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" q"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("->")]),t._v("rear"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br"),s("span",{staticClass:"line-number"},[t._v("7")]),s("br"),s("span",{staticClass:"line-number"},[t._v("8")]),s("br"),s("span",{staticClass:"line-number"},[t._v("9")]),s("br"),s("span",{staticClass:"line-number"},[t._v("10")]),s("br"),s("span",{staticClass:"line-number"},[t._v("11")]),s("br"),s("span",{staticClass:"line-number"},[t._v("12")]),s("br"),s("span",{staticClass:"line-number"},[t._v("13")]),s("br")])]),s("h3",{attrs:{id:"삽입"}},[t._v("삽입")]),t._v(" "),s("p",[t._v("삽입할 때는 포화상태가 아니면 기존 "),s("code",[t._v("rear")]),t._v("에 "),s("code",[t._v("1")]),t._v("을 더하고 "),s("code",[t._v("SIZE")]),t._v("로 나눈 나머지를 새로운 "),s("code",[t._v("rear")]),t._v("로 둔다. 그 다음 1차원 배열을 "),s("code",[t._v("rear")]),t._v("로 액세스해 값을 변경한다.")]),t._v(" "),s("div",{staticClass:"language-C line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-c"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("enqueue")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("QueueType "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("q"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" element item"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("is_full")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("q"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("printError")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Queue is full."')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  q"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("->")]),t._v("rear "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("q"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("->")]),t._v("rear "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("%")]),t._v(" SIZE"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  q"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("->")]),t._v("data"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("q"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("->")]),t._v("rear"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" item"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br")])]),s("h3",{attrs:{id:"제거"}},[t._v("제거")]),t._v(" "),s("p",[t._v("제거는 "),s("code",[t._v("front")]),t._v("를 1 증가시키고 그 위치의 데이터를 리턴한다. 처음에는 "),s("code",[t._v("front")]),t._v('가 1 증가되면 그 다음 요소가 반환되지 않을까 싶었는데, 매우 똑똑한 동기가 "어차피 front는 시작 요소의 인덱스보다 하나 적으니까 '),s("code",[t._v("+1")]),t._v(' 하면 실제 그위치의 데이터겠지" 라고 하는 것을 듣고 원형 큐를 완벽히 이해해버렸다. 공백상태에 대해 적으면서도 와닿지 않았는데, 드디어 원형 큐가 와닿게 됐다.. 하지만 시험은 망할 예정이다 😇')]),t._v(" "),s("div",{staticClass:"language-C line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-c"}},[s("code",[t._v("element "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("dequeue")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("QueueType "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("q"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("is_empty")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("q"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("printError")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Queue is empty."')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  q"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("->")]),t._v("front "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("q"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("->")]),t._v("front "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("%")]),t._v(" SIZE"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" q"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("->")]),t._v("data"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("q"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("->")]),t._v("front"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br")])])])}),[],!1,null,null,null);s.default=e.exports}}]);