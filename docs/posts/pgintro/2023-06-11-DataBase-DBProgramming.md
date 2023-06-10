---
layout: post
title: "데이터베이스: 데이터베이스 프로그래밍"
category: CS
date: "2023-06-11 00:06:00"
---

- 데이터를 정의하고 데이터를 입력하고, 저장된 데이터를 읽어와 데이터를 변경하는 프로그램을 작성하는 과정

### HTML과 PHP 프로그래밍

- Static Web Site: 고정되고 변화가 없는 정적인 웹사이트
- HTML
    - 대소문자 구분 X
    - `<u></u>` : 밑줄
    - `<b></b>` : 볼드
    - `<i></i>` : 이탤릭
    - `<font></font>` : 폰트 크기/색상/스타일
- PHP
    - `$a = 100;` 변수 a 선언, 100 으로 초기화, 문자/숫자/언더스코어 사용 가능 but 숫자로 시작 X, 대소문자 구분, 사용도 `$` 붙여야함
    - 배열
        - `$arr1 = array([...values]);`
        - `$arr2 = range(start, end, step);`
        - `$arr3[0] = value1; $arr3[1] = value2; ...`

```sql
// 한줄 주석
/*
여러줄 주석
*/
```

- MySQL 연결

```
$conn = mysqli_connect($db_host, $db_user, $db_password, $db_name);
```