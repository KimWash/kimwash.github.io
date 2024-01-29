(window.webpackJsonp=window.webpackJsonp||[]).push([[54],{382:function(s,t,a){"use strict";a.r(t);var n=a(15),e=Object(n.a)({},(function(){var s=this,t=s._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h3",{attrs:{id:"데이터베이스-여러-사용자나-응용-프로그램들이-공유하고-동시에-접근-가능한-데이터의-집합-데이터의-저장공간-자체"}},[s._v("데이터베이스: 여러 사용자나 응용 프로그램들이 공유하고 동시에 접근 가능한 ‘데이터의 집합', ‘데이터의 저장공간' 자체")]),s._v(" "),t("h3",{attrs:{id:"dbms-database-management-system-데이터베이스를-관리-운영하는-소프트웨어"}},[s._v("DBMS(DataBase Management System): 데이터베이스를 관리/운영하는 소프트웨어")]),s._v(" "),t("h3",{attrs:{id:"mysql"}},[s._v("MySQL")]),s._v(" "),t("ul",[t("li",[s._v('My: 개발자 “마이클 와이드니우스"의 딸 이름')]),s._v(" "),t("li",[s._v("썬 마이크로시스템즈 → 오라클 로 인수")]),s._v(" "),t("li",[s._v("GNU GPL")]),s._v(" "),t("li",[s._v("상용\n"),t("ul",[t("li",[s._v("Standard < Enterprise < Cluster CGE")])])]),s._v(" "),t("li",[s._v("무료: Community) 엔터프라이즈와 사용 허가에 대한 라이선스만 차이 있음")])]),s._v(" "),t("h3",{attrs:{id:"mariadb"}},[s._v("MariaDB")]),s._v(" "),t("ul",[t("li",[s._v('썬개발자 “마이클 와이드니우스"가 썬 마이크로시스템즈를 떠나 개발한 RDBMS')]),s._v(" "),t("li",[s._v('Maria: 개발자 “마이클 와이드니우스"의 딸 이름')]),s._v(" "),t("li",[s._v("상용으로 MySQL의 기능과 같은 것을 라이센스 문제 없이 사용하고 싶다면 → MariaDB")]),s._v(" "),t("li",[s._v("호환성 좋음")])]),s._v(" "),t("h2",{attrs:{id:"mysql-사용"}},[s._v("MySQL 사용")]),s._v(" "),t("h3",{attrs:{id:"command-line-tool"}},[s._v("Command Line Tool")]),s._v(" "),t("p",[t("code",[s._v("mysql -u root -p")]),s._v("  를 이용 Command Line Tool 접근")]),s._v(" "),t("p",[s._v("번개 모양 아이콘을 클릭해 쿼리문 실행 or "),t("code",[s._v("Ctrl + Shift + Enter")])]),s._v(" "),t("p",[s._v("문장 단위 실행: "),t("code",[s._v("Ctrl + Enter")])]),s._v(" "),t("div",{staticClass:"language-sql line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sql"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("create")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("user")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("user")]),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("@localhost")]),s._v(" identified "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("WITH")]),s._v(" mysql_native_password "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("by")]),s._v(" 'password"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("grant")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("all")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("privileges")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("on")]),s._v(" testdb"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("to")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("user")]),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("@localhost")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("with")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("grant")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("option")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("commit")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("p",[s._v("여러줄 실행: "),t("code",[s._v("번개 모양 아이콘 혹은 ctrl+shift+Enter")]),s._v(" !")]),s._v(" "),t("h3",{attrs:{id:"mysql-문법"}},[s._v("MySQL 문법")]),s._v(" "),t("ul",[t("li",[t("p",[s._v("주석")]),s._v(" "),t("ul",[t("li",[t("code",[s._v("-- This is comment")])])]),s._v(" "),t("div",{staticClass:"language-sql line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sql"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/* \nthis is multiline \ncomment\n*/")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br")])])]),s._v(" "),t("li",[t("p",[s._v("개체 이름: 영문 (한글 사용 가능 but 실무에선 그딴짓 안함)")])]),s._v(" "),t("li",[t("p",[s._v("대소문자 구분 안함. 대문자 혹은 소문자로 통일하자. 특히 예약어는 보통 대문자, 정의어 (테이블 이름, 열 이름 등)은 대소문자를 섞어서 가독성 좋은 이름으로 지정")]),s._v(" "),t("ul",[t("li",[s._v("내부적으로는 테이블 이름, 열 이름 등을 모두 소문자로 치환되어 저장")]),s._v(" "),t("li",[s._v("→ book == booK == boOK")])])])]),s._v(" "),t("h3",{attrs:{id:"dml"}},[s._v("DML")]),s._v(" "),t("ul",[t("li",[s._v("SELECT (대괄호 내부: 선택적)")])]),s._v(" "),t("div",{staticClass:"language-sql line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sql"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("SELECT")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("ALL")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("DISTINCT")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" 속성이름"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("들"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("-- DISTINCT: 중복을 허용하지 않음 | ALL: 중복을 허용함(기본값)")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("FROM")]),s._v(" 테이블이름"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("들"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("WHERE")]),s._v(" 검색조건"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("들"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("GROUP")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("BY")]),s._v(" 속성이름"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("HAVING")]),s._v(" 속성이름"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("들"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("ORDER")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("BY")]),s._v(" 속성이름 "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("ASC")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("DESC")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br")])]),t("ul",[t("li",[t("p",[s._v("LIKE 키워드: 문자열이 부분적으로 일치하는 데이터 검색")])]),s._v(" "),t("li",[t("p",[s._v("와일드 문자")]),s._v(" "),t("ul",[t("li",[s._v("%: 0개 이상의 문자열과 일치 ex) ‘%축구%’")]),s._v(" "),t("li",[t("em",[s._v("_: 특정 위치의 1개의 문자와 일치 ex) ‘_구%’: 두번째 위치에 ‘구'가 들어기는 문자열")])]),s._v(" "),t("li",[t("em",[s._v("+: 문자열 연결")])]),s._v(" "),t("li",[t("em",[s._v("[ ]: 1개의 문자와 일치 ex) ‘[0-5] %’: 0-5 사이의 숫자로 시작하는 문자열")])]),s._v(" "),t("li",[t("em",[s._v("[^]: 1개의 문자와 불일치 ex) ‘[^0-5]%’: 0-5 사이의 숫자로 시작하지 않는 문자열")])])])]),s._v(" "),t("li",[t("p",[t("em",[s._v("집계 함수: 개수, 합계, 평균, 최댓/최솟값 등을 계산하는 기능 제공")])]),s._v(" "),t("ul",[t("li",[t("em",[s._v("NULL인 속성은 제외")])]),s._v(" "),t("li",[t("em",[s._v("WHERE 절에서 사용 불가능, SELECT/HAVING 절에서 사용 가능")])]),s._v(" "),t("li",[t("em",[s._v("종류")]),s._v(" "),t("ul",[t("li",[t("em",[s._v("SUM")])]),s._v(" "),t("li",[t("em",[s._v("AVG")])]),s._v(" "),t("li",[s._v("*COUNT([ALL|DISTINCT] 속성이름 | "),t("em",[s._v(")")])]),s._v(" "),t("li",[t("em",[s._v("MAX")])]),s._v(" "),t("li",[t("em",[s._v("MIN")])])])]),s._v(" "),t("li",[s._v("열 이름의 별칭(alias)을 "),t("code",[s._v("AS")]),s._v(" 키워드를 이용해 지정 가능")]),s._v(" "),t("li",[s._v("DISTINCT 키워드를 이용해 튜플의 중복에 대해 무시하고 계산")])])]),s._v(" "),t("li",[t("p",[t("em",[s._v("그룹별 검색")])]),s._v(" "),t("ul",[t("li",[t("em",[t("code",[s._v("GROUP BY")]),s._v(" :특정 속성의 값이 같은 튜플을 그룹으로 만들고, 그룹별로 검색")])]),s._v(" "),t("li",[t("em",[t("code",[s._v("HAVING")]),s._v(" : 그룹에 대한 조건을 작성")])]),s._v(" "),t("li",[t("em",[s._v("그룹을 나누는 기준이 되는 속성을 SELECT 절에도 작성하는 것이 좋음.")])]),s._v(" "),t("li",[s._v("실행순서")])]),s._v(" "),t("div",{staticClass:"language-sql line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sql"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("SELECT")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("ALL")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("DISTINCT")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" 속성이름"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("들"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("-- DISTINCT: 중복을 허용하지 않음 | ALL: 중복을 허용함(기본값) --- (5)")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("FROM")]),s._v(" 테이블이름"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("들"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("--- (1)")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("WHERE")]),s._v(" 검색조건"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("들"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("--- (2)")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("GROUP")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("BY")]),s._v(" 속성이름"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("--- (3)")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("HAVING")]),s._v(" 속성이름"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("들"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("--- (4)")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("ORDER")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("BY")]),s._v(" 속성이름 "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("ASC")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("DESC")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("--- (6)")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br")])])]),s._v(" "),t("li",[t("p",[s._v("조인")]),s._v(" "),t("ul",[t("li",[s._v("일반적으로 외래키를 조인 속성으로 이용함")]),s._v(" "),t("li",[s._v("속성 이름 앞에 해당 속성이 소속된 테이블의 이름을 표시 → ambigous 문제 해결")]),s._v(" "),t("li",[t("code",[s._v("SELECT <속성들>FROM 테이블1, 테이블2WHERE <조인조건> AND <검색조건>")])])])]),s._v(" "),t("li",[t("p",[s._v("INSERT: "),t("code",[s._v("INSERT INTO 테이블이름 [(속성리스트)] VALUES(값리스트);")])]),s._v(" "),t("ul",[t("li",[s._v("속성 리스트를 생략 → 정의할 때 지정한 속성의 순서대로 삽입")]),s._v(" "),t("li",[s._v("VALUES 키워드와 함께 삽입할 속성 값들을 나열 *INTO 절의 속성이름과 VALUES 절의 속성 값들은 일대일 대응")])])]),s._v(" "),t("li",[t("p",[s._v("UPDATE: "),t("code",[s._v("UPDATE 테이블이름 SET 속성이름1=값1, [, 속성이름2=값2, ...] [WHERE 검색조건];")])])]),s._v(" "),t("li",[t("p",[s._v("DELETE: "),t("code",[s._v("DELETE FROM 테이블이름 [WHERE 검색조건];")])])])]),s._v(" "),t("h3",{attrs:{id:"ddl"}},[s._v("DDL")]),s._v(" "),t("ul",[t("li",[t("p",[s._v("CREATE")]),s._v(" "),t("div",{staticClass:"language-sql line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sql"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("CREATE")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("TABLE")]),s._v(" 테이블이름\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("{속성이름 데이터타입 "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("NOT")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("NULL")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("UNIQUE")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("DEFAULT")]),s._v(" 기본값 "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("CHECK")]),s._v(" 체크조건 "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("PRIMARY")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("KEY")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("}"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("PRIMARY")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("KEY")]),s._v(" 속성이름"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("들"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("-- 속성 선언부에서 PRIMARY KEY 키워드로 선언했으면 이용 금지")]),s._v("\n{\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("FOREIGN")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("KEY")]),s._v(" 속성이름 "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("REFERENCES")]),s._v(" 테이블이름"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("속성이름"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("ON")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("DELETE")]),s._v(" 옵션"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("--- 옵션: RESTRICT | CASCADE | SET NULL | NO ACTION | SET DEFAULT")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("ON")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("UPDATE")]),s._v(" 옵션"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" \n}\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br")])]),t("ul",[t("li",[s._v("타입\n"),t("ul",[t("li",[s._v("INTEGER/INT: 4바이트 정수형")]),s._v(" "),t("li",[s._v("SMALLINT: 2바이트 정수")]),s._v(" "),t("li",[s._v("BIGINT: 8바이트 정수")])])])])]),s._v(" "),t("li",[t("p",[s._v("NUMERIC/DECIMAL(m,d): 전체 m자리, 소수점이하 d자리 숫자형")])]),s._v(" "),t("li",[t("p",[s._v("FLOAT: 4바이트 실수, 소수점 이하 7자리")])]),s._v(" "),t("li",[t("p",[s._v("DOUBLE: 8바이트 실수, 소수점 이하 15자리")])]),s._v(" "),t("li",[t("p",[s._v("CHAR(n): 문자형 고정 길이 (문자를 저장하고 남은 공간은 공백")])]),s._v(" "),t("li",[t("p",[s._v("VARCHAR(n): 문자형 가변길이 *CHAR과 저장된 값이 같아도 CHAR은 공백을 채운 문자열이라 동등 비교 시 실패 가능성 존재")])]),s._v(" "),t("li",[t("p",[s._v("LONGTEXT: 최대 4GB 크기의 TEXT 데이터 저장")])]),s._v(" "),t("li",[t("p",[s._v("LONGBLOB: 최대 4GB 크기의 BLOB 데이터 저장")])]),s._v(" "),t("li",[t("p",[s._v("DATE: 날짜형, 3바이트, “YYYY-MM-DD” 형태")])]),s._v(" "),t("li",[t("p",[s._v("DATETIME: 날짜/시간형, 8바이트, “YYYY-MM-DD HH:mm:SS” 형태")])]),s._v(" "),t("li",[t("p",[s._v("키")]),s._v(" "),t("ul",[t("li",[t("code",[s._v("UNIQUE")]),s._v(" : 대체키를 지정. 유일성을 가지며 기본키와 달리 NULL이 허용")]),s._v(" "),t("li",[t("code",[s._v("FOREIGN KEY")]),s._v(" : 외래키를 지정.\n"),t("ul",[t("li",[s._v("무슨 속성을 참조하는지 "),t("code",[s._v("REFERENCES")]),s._v(" 키워드를 다음에 제시")]),s._v(" "),t("li",[s._v("ex) "),t("code",[s._v("FOREIGN KEY(속성이름) REFERENCES 테이블(속성이름)")])]),s._v(" "),t("li",[s._v("참조 무결성 제약조건 유지를 위해 참조되는 테이블에서 튜플 삭제 시 처리 방법을 지정하는 옵션들\n"),t("ul",[t("li",[s._v("ON DELETE/UPDATE +")])]),s._v(" "),t("ol",[t("li",[s._v("RESTRICT: 부모 테이블의 튜플 삭제/업데이트 X")]),s._v(" "),t("li",[s._v("NO ACTION: 튜플을 삭제/업데이트하지 못하게 함")]),s._v(" "),t("li",[s._v("CASCADE: 관련 튜플을 함께 삭제/업데이트함")]),s._v(" "),t("li",[s._v("SET NULL: 관련 튜플의 외래키 값을 NULL로 변경함")]),s._v(" "),t("li",[s._v("SET DEFAULT: 관련 튜플의 외래키 값을 미리 지정한 기본값으로 변경함")])])])])])])]),s._v(" "),t("li",[t("p",[s._v("ALTER TABLE: 생성된 테이블의 속성과 속성에 관한 제약을 변경, 기본키/외래키 변경")]),s._v(" "),t("ul",[t("li",[s._v("ADD/DROP: 속성 추가/제거")]),s._v(" "),t("li",[s._v("MODIFY: 속성의 기본값을 설정/삭제")]),s._v(" "),t("li",[s._v("ADD <제약이름>, DROP <제약이름> → 제약사항 추가/제거")])]),s._v(" "),t("div",{staticClass:"language-sql line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sql"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("ALTER")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("TABLE")]),s._v(" 테이블이름\n  "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("ADD")]),s._v(" 속성이름 데이터타입"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("DROP")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("COLUMN")]),s._v(" 속성이름"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("MODIFY")]),s._v(" 속성이름 데이터타입"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("MODIFY")]),s._v(" 속성이름 "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("NULL")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("NOT")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("NULL")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("ADD")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("PRIMARY")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("KEY")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("속성이름"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("ADD")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("DROP")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" 제약이름"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br")])])]),s._v(" "),t("li",[t("p",[s._v("DROP TABLE: 테이블의 구조와 데이터를 모두 삭제")])])])])}),[],!1,null,null,null);t.default=e.exports}}]);