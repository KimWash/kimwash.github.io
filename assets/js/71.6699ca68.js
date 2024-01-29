(window.webpackJsonp=window.webpackJsonp||[]).push([[71],{351:function(t,s,a){"use strict";a.r(s);var i=a(15),n=Object(i.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h3",{attrs:{id:"카이사르-암호화"}},[t._v("카이사르 암호화")]),t._v(" "),s("p",[t._v("암호화하고자 하는 내용을 알파벳별로 일정한 거리만큼 밀어서 다른 알파벳으로 치환하는 암호화 방법으로, 문자열과 정수형 키를 주면 키값만큼 알파벳을 밀어서 치환하게 된다. 이때, 소문자만으로 이루어졌다 치면 밀었을 때 a-z의 범위를 벗어나게 되면 다시 돌아오게 되는데 이걸 처리해주는게 은근히 복잡하다.")]),t._v(" "),s("h3",{attrs:{id:"공백과-영소문자로-이루어진-문자열-암호화"}},[t._v("공백과 영소문자로 이루어진 문자열 암호화")]),t._v(" "),s("p",[t._v("각 문자에 대해 아스키코드 값을 이용해 순서를 처리하게 되는데, 암호화하고자 하는 문자열이 p, 키가 k일때 공백의 뒤에 영소문자가 있게끔 만들어줘야 하므로 문자의 아스키코드가 공백의 아스키코드일 경우 아스키코드값을 a의 아스키코드 값보다 1 적은것으로 지정해 k만큼 밀어줬을 때 알파벳의 범위가 나올 것이다. 그리고 실제로 아스키코드에 k를 더해주었는데 만약 z의 아스키코드 값보다 커지면 알파벳은 26자인데 공백까지 27자라고 하면 다시 공백의 아스키코드 값 부터 시작하기 위해 27을 빼준다. 그렇게 했을 때 아스키코드가 a의 아스키코드 값보다 1 작은, 공백으로 처리하기로 한 값이 되면 실제 공백의 아스키코드 값으로 바꿔주고, 아스키코드를 문자로 치환해준다.")]),t._v(" "),s("h3",{attrs:{id:"공백과-영대-소문자로-이루어진-문자열-암호화"}},[t._v("공백과 영대/소문자로 이루어진 문자열 암호화")]),t._v(" "),s("p",[t._v("a-z -> 공백 -> A-Z 순으로 되게 해야한다.\n따라서 공백을 A의 아스키코드보다 1 작은 64로 바꿔준다. 그리고 k를 더한다. 그 이후 k를 더한 값이 Z의 아스키코드 90보다 크고 a의 아스키코드 97보다 작거나, 96보다 크고 122보다 작으면서 원래 문자의 아스키코드는 91보다 작은 경우 6을 더한다. 이렇게 하는 이유는, "),s("span",{staticClass:"katex"},[s("span",{staticClass:"katex-mathml"},[s("math",[s("semantics",[s("mrow",[s("msup",[s("mrow"),s("mn",[t._v("1")])],1)],1),s("annotation",{attrs:{encoding:"application/x-tex"}},[t._v("^1")])],1)],1)],1),s("span",{staticClass:"katex-html",attrs:{"aria-hidden":"true"}},[s("span",{staticClass:"base"},[s("span",{staticClass:"strut",staticStyle:{height:"0.8141079999999999em","vertical-align":"0em"}}),s("span",{staticClass:"mord"},[s("span"),s("span",{staticClass:"msupsub"},[s("span",{staticClass:"vlist-t"},[s("span",{staticClass:"vlist-r"},[s("span",{staticClass:"vlist",staticStyle:{height:"0.8141079999999999em"}},[s("span",{staticStyle:{top:"-3.063em","margin-right":"0.05em"}},[s("span",{staticClass:"pstrut",staticStyle:{height:"2.7em"}}),s("span",{staticClass:"sizing reset-size6 size3 mtight"},[s("span",{staticClass:"mord mtight"},[t._v("1")])])])])])])])])])])]),t._v("대문자에서 소문자로 넘어가다가 90~97 구간에서 걸리는 경우 "),s("span",{staticClass:"katex"},[s("span",{staticClass:"katex-mathml"},[s("math",[s("semantics",[s("mrow",[s("msup",[s("mrow"),s("mn",[t._v("2")])],1)],1),s("annotation",{attrs:{encoding:"application/x-tex"}},[t._v("^2")])],1)],1)],1),s("span",{staticClass:"katex-html",attrs:{"aria-hidden":"true"}},[s("span",{staticClass:"base"},[s("span",{staticClass:"strut",staticStyle:{height:"0.8141079999999999em","vertical-align":"0em"}}),s("span",{staticClass:"mord"},[s("span"),s("span",{staticClass:"msupsub"},[s("span",{staticClass:"vlist-t"},[s("span",{staticClass:"vlist-r"},[s("span",{staticClass:"vlist",staticStyle:{height:"0.8141079999999999em"}},[s("span",{staticStyle:{top:"-3.063em","margin-right":"0.05em"}},[s("span",{staticClass:"pstrut",staticStyle:{height:"2.7em"}}),s("span",{staticClass:"sizing reset-size6 size3 mtight"},[s("span",{staticClass:"mord mtight"},[t._v("2")])])])])])])])])])])]),t._v("소문자로 넘어왔지만 기존 문자가 소문자여서 90~97의 간격만큼 더해줘야하는 경우 그런 다음 122를 넘어가면 다시 64로 돌려보내기 위해 59를 빼준다. 그 다음 아스키코드가 64이면 실제 공백의 것으로 바꿔준다.")])])}),[],!1,null,null,null);s.default=n.exports}}]);