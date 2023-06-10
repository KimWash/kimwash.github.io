---
layout: post
title: "데이터베이스: MySQL"
category: CS
date: "2023-06-11"
---

### 데이터베이스: 여러 사용자나 응용 프로그램들이 공유하고 동시에 접근 가능한 ‘데이터의 집합', ‘데이터의 저장공간' 자체

### DBMS(DataBase Management System): 데이터베이스를 관리/운영하는 소프트웨어

### MySQL

- My: 개발자 “마이클 와이드니우스"의 딸 이름
- 썬 마이크로시스템즈 → 오라클 로 인수
- GNU GPL
- 상용
    - Standard < Enterprise < Cluster CGE
- 무료: Community) 엔터프라이즈와 사용 허가에 대한 라이선스만 차이 있음

### MariaDB

- 썬개발자 “마이클 와이드니우스"가 썬 마이크로시스템즈를 떠나 개발한 RDBMS
- Maria: 개발자 “마이클 와이드니우스"의 딸 이름
- 상용으로 MySQL의 기능과 같은 것을 라이센스 문제 없이 사용하고 싶다면 → MariaDB
- 호환성 좋음

## MySQL 사용

### Command Line Tool

`mysql -u root -p`  를 이용 Command Line Tool 접근

번개 모양 아이콘을 클릭해 쿼리문 실행 or `Ctrl + Shift + Enter`

문장 단위 실행: `Ctrl + Enter`

```sql
create user user@localhost identified WITH mysql_native_password by 'password;
grant all privileges on testdb.* to user@localhost with grant option; commit;
```

여러줄 실행: `번개 모양 아이콘 혹은 ctrl+shift+Enter` !

### MySQL 문법

- 주석
    - `-- This is comment`
    
    ```sql
    /* 
    this is multiline 
    comment
    */
    ```
    
- 개체 이름: 영문 (한글 사용 가능 but 실무에선 그딴짓 안함)
- 대소문자 구분 안함. 대문자 혹은 소문자로 통일하자. 특히 예약어는 보통 대문자, 정의어 (테이블 이름, 열 이름 등)은 대소문자를 섞어서 가독성 좋은 이름으로 지정
    - 내부적으로는 테이블 이름, 열 이름 등을 모두 소문자로 치환되어 저장
    - → book == booK == boOK

### DML

- SELECT (대괄호 내부: 선택적)

```sql
SELECT [ALL | DISTINCT] 속성이름(들) -- DISTINCT: 중복을 허용하지 않음 | ALL: 중복을 허용함(기본값)
FROM 테이블이름(들)
[WHERE 검색조건(들)]
[GROUP BY 속성이름]
[HAVING 속성이름(들)]
[ORDER BY 속성이름 [ASC|DESC] ]
```

- LIKE 키워드: 문자열이 부분적으로 일치하는 데이터 검색
- 와일드 문자
    - %: 0개 이상의 문자열과 일치 ex) ‘%축구%’
    - *_: 특정 위치의 1개의 문자와 일치 ex) ‘_구%’: 두번째 위치에 ‘구'가 들어기는 문자열*
    - *+: 문자열 연결*
    - *[ ]: 1개의 문자와 일치 ex) ‘[0-5] %’: 0-5 사이의 숫자로 시작하는 문자열*
    - *[^]: 1개의 문자와 불일치 ex) ‘[^0-5]%’: 0-5 사이의 숫자로 시작하지 않는 문자열*
- *집계 함수: 개수, 합계, 평균, 최댓/최솟값 등을 계산하는 기능 제공*
    - *NULL인 속성은 제외*
    - *WHERE 절에서 사용 불가능, SELECT/HAVING 절에서 사용 가능*
    - *종류*
        - *SUM*
        - *AVG*
        - *COUNT([ALL|DISTINCT] 속성이름 | *)*
        - *MAX*
        - *MIN*
    - 열 이름의 별칭(alias)을 `AS` 키워드를 이용해 지정 가능
    - DISTINCT 키워드를 이용해 튜플의 중복에 대해 무시하고 계산
- *그룹별 검색*
    - *`GROUP BY` :특정 속성의 값이 같은 튜플을 그룹으로 만들고, 그룹별로 검색*
    - *`HAVING` : 그룹에 대한 조건을 작성*
    - *그룹을 나누는 기준이 되는 속성을 SELECT 절에도 작성하는 것이 좋음.*
    - 실행순서
    
    ```sql
    SELECT [ALL | DISTINCT] 속성이름(들) -- DISTINCT: 중복을 허용하지 않음 | ALL: 중복을 허용함(기본값) --- (5)
    FROM 테이블이름(들) --- (1)
    [WHERE 검색조건(들)] --- (2)
    [GROUP BY 속성이름] --- (3)
    [HAVING 속성이름(들)] --- (4)
    [ORDER BY 속성이름 [ASC|DESC] ] --- (6)
    ```
    
- 조인
    - 일반적으로 외래키를 조인 속성으로 이용함
    - 속성 이름 앞에 해당 속성이 소속된 테이블의 이름을 표시 → ambigous 문제 해결
    - `SELECT <속성들>FROM 테이블1, 테이블2WHERE <조인조건> AND <검색조건>`
- INSERT: `INSERT INTO 테이블이름 [(속성리스트)] VALUES(값리스트);`
    - 속성 리스트를 생략 → 정의할 때 지정한 속성의 순서대로 삽입
    - VALUES 키워드와 함께 삽입할 속성 값들을 나열 *INTO 절의 속성이름과 VALUES 절의 속성 값들은 일대일 대응
- UPDATE: `UPDATE 테이블이름 SET 속성이름1=값1, [, 속성이름2=값2, ...] [WHERE 검색조건];`
- DELETE: `DELETE FROM 테이블이름 [WHERE 검색조건];`

### DDL

- CREATE
    
    ```sql
    CREATE TABLE 테이블이름
    ({속성이름 데이터타입 [NOT NULL | UNIQUE | DEFAULT 기본값 | CHECK 체크조건 | PRIMARY KEY]})
    [PRIMARY KEY 속성이름(들)] -- 속성 선언부에서 PRIMARY KEY 키워드로 선언했으면 이용 금지
    {
    [FOREIGN KEY 속성이름 REFERENCES 테이블이름(속성이름)]
    [ON DELETE 옵션] --- 옵션: RESTRICT | CASCADE | SET NULL | NO ACTION | SET DEFAULT
    [ON UPDATE 옵션] 
    }
    ```
    
    - 타입
        - INTEGER/INT: 4바이트 정수형
        - SMALLINT: 2바이트 정수
        - BIGINT: 8바이트 정수
- NUMERIC/DECIMAL(m,d): 전체 m자리, 소수점이하 d자리 숫자형
- FLOAT: 4바이트 실수, 소수점 이하 7자리
- DOUBLE: 8바이트 실수, 소수점 이하 15자리
- CHAR(n): 문자형 고정 길이 (문자를 저장하고 남은 공간은 공백
- VARCHAR(n): 문자형 가변길이 *CHAR과 저장된 값이 같아도 CHAR은 공백을 채운 문자열이라 동등 비교 시 실패 가능성 존재
- LONGTEXT: 최대 4GB 크기의 TEXT 데이터 저장
- LONGBLOB: 최대 4GB 크기의 BLOB 데이터 저장
- DATE: 날짜형, 3바이트, “YYYY-MM-DD” 형태
- DATETIME: 날짜/시간형, 8바이트, “YYYY-MM-DD HH:mm:SS” 형태
- 키
    - `UNIQUE` : 대체키를 지정. 유일성을 가지며 기본키와 달리 NULL이 허용
    - `FOREIGN KEY` : 외래키를 지정.
        - 무슨 속성을 참조하는지 `REFERENCES` 키워드를 다음에 제시
        - ex) `FOREIGN KEY(속성이름) REFERENCES 테이블(속성이름)`
        - 참조 무결성 제약조건 유지를 위해 참조되는 테이블에서 튜플 삭제 시 처리 방법을 지정하는 옵션들
            - ON DELETE/UPDATE +
            1. RESTRICT: 부모 테이블의 튜플 삭제/업데이트 X
            2. NO ACTION: 튜플을 삭제/업데이트하지 못하게 함
            3. CASCADE: 관련 튜플을 함께 삭제/업데이트함
            4. SET NULL: 관련 튜플의 외래키 값을 NULL로 변경함
            5. SET DEFAULT: 관련 튜플의 외래키 값을 미리 지정한 기본값으로 변경함
- ALTER TABLE: 생성된 테이블의 속성과 속성에 관한 제약을 변경, 기본키/외래키 변경
    - ADD/DROP: 속성 추가/제거
    - MODIFY: 속성의 기본값을 설정/삭제
    - ADD <제약이름>, DROP <제약이름> → 제약사항 추가/제거
    
    ```sql
    ALTER TABLE 테이블이름
      [ADD 속성이름 데이터타입]
      [DROP COLUMN 속성이름]
      [MODIFY 속성이름 데이터타입]
      [MODIFY 속성이름 [NULL | NOT NULL]
      [ADD PRIMARY KEY(속성이름)]
      [[ADD|DROP] 제약이름]
    ```
    
- DROP TABLE: 테이블의 구조와 데이터를 모두 삭제