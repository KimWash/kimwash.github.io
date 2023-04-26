---
layout: post
title: "Java언어 - 중간고사 정리: 중간고사 코틀린으로 보면 안되나요?"
category: CS
date: "2023-04-26"
---

### 태동

`1991`년 그린 프로젝트(Green Project)
– 선마이크로시스템즈의 제임스 고슬링*(James Gosling)*에 의해 시작

- 초기 이름 : 오크(OAK)
    - – 인터넷과 웹의 엄청난 발전에 힘입어 퍼지게 됨
    - – 웹 브라우저 *Netscape*에서 실행
- WORA(Write Once Run Anywhere)
    - 바이트 코드 `.class`
        
        자바 코드를 컴파일한 코드
        
        - CPU에 종속X
        - JVM이 실행

### JVM/JRE

- JVM(Java Virtual Machine)
    - 인터프리터 방식으로 바이트 코드 해석
    - 필요한 것만 Class-Loading
        
        필요하면 ClassLoader 클래스로 개발자가 직접 클래스 로딩도 가능.
        
- JRE(Java Runtime Environment)
    - JVM 포함
    - 컴파일된 자바 API 포함
- Executables
    - – *java**c** -* 자바 소스를 바이트 코드로 변환하는 컴파일러
    - – *java -* 자바 응용프로그램 실행기*.* 자바 가상 머신을 작동시켜 자바프로그램 실행

### 자바 배포판 종류

- SE: Standard Edition: 데스크톱/서버
- ME: Micro Edition: 임베디드/IoT등 소형기기
- EE: Enterprise Edition (→ Jakarta EE): 다중 사용자, 기업용 응용프로그램

### Multi-Threading

- 멀티스레드
– 자바는 운영체제의 도움 없이 자체적으로 멀티스레드 지원
- C/C++ 등에서는 멀티스레드 운영체제 API를 호출

### 실시간 응용 시스템에 부적합

- 자바응용프로그램은실행도중예측할수없는시점에가비지컬렉션실행
- 일정 시간*(deadline)* 내에 반드시 실행 결과를 내야만 하는 실시간 시스템에
는 부적합

### 타입과 관련된 Properties

- 문자열은 기본 타입이 아님
- String 클래스로 문자열 표현
- 정수 리터럴은 10진수/2진수/8진수/16진수로 표현 가능.
    
    15 ⇒ 10진수 $15_{10}$
    
    **0**15 ⇒ 8진수 $8_{10}$
    
    **0x**15 ⇒ 16진수 $21_{10}$
    
    **0b**0101 ⇒ 2진수 $5_{10}$
    
- long 타입 리터럴은 숫자 뒤에 L 또는 l을 붙여 표시
    
    ex) long g = 24L;
    
- `\u` 다음에 4자리 16진수(2바이트의 유니코드)
- `\u0041` -> 문자 'A'의 유니코드(0041)
- `\uae00` -> 한글문자 '글'의 유니코드(ae00)
- null은 Reference 에만 대입 가능.
- JDK7부터 **숫자 리터럴의 아무 위치에나 언더스코어(‘_’) 허용, 컴파일러에서는 빼고 처리**
- 상수는 `final` 키워드로 선언
- Explicit type casting: `(byte) a`

### Stars *예시프로그램

```java
public class Stars {
	public static void main(String[] args) {
		for (int i = 5; i > 0; i--) {
			for (int j = 0; j < i; j++) {
				System.out.print("*");
			}
			System.out.println("");
		}
	}
}
```

### Scanner

자바의 표준 입력 스트림 `System.in`에게 키를 읽게 하고, 읽은 바이트를 문자, 정수, 실수, 불린, 문자열 등 다양한 타입으로 변환하여 반환. 공백으로 토큰 구분

![Screenshot 2023-04-25 at 11.07.40.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f8e167d4-81b9-4899-b321-461199eeaf4f/Screenshot_2023-04-25_at_11.07.40.png)

### 16진수 출력

`%04x` : `%x` 로 16진수임을 지정, `04` 로 자릿수 지정

### 반복문 특이한 형태

```java
for(초기작업; ; 반복후작업) { // 반복조건이 비어 있으면 true로 간주, 무한 반복
	// Tasks
}
// 초기 작업과 반복후작업은 ‘,’로 분리하여 여러 문장 나열 가능 
for(i=0; i<10; i++, System.out.println(i)) {
	// Tasks
}
```

### do-while

```java
int i = 0;
do {
	System.out.println(i);
	i++;
}
while (i < 10);
```

block execution → condition check 순으로 동작

condition check가 선순위인 while 문과 다른 점

![Screenshot 2023-04-25 at 10.48.21.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/72701cbf-3cb0-4e37-905c-bcdc895b6cb4/Screenshot_2023-04-25_at_10.48.21.png)

### 배열

```java
int arr[];
arr = new int[10];
```

레퍼런스 변수 선언 후 실제 배열 객체를 생성해서 넣거나

```java
int arr[10] = {1,2,3,4,5,6,7,8,9,10};
```

선언과 함께 초기화할 수 있다.

```java
// 아래 for-each에서 s는 names[0], names[1], ..., names[5]로 반복 
for (String s : names)
	System.out.print(s + " ");
```

배열을 for 문에 `item: array` 형태로 넣어 준다.

```java
intArray = new int[2][5];
```

이차원 배열 객체 생성

### main 함수

- 반드시 static
- 반드시 public
- 반드시 void
- 반드시 매개변수 타입은 문자열 배열

### Exception

```java
try {
	// 예외가 발생할 가능성이 있는 실행문(try 블록)
}
catch (처리할 예외 타입 선언) {
	// 예외 처리문(catch 블록) }
finally {
	// 예외 발생 여부와 상관없이 무조건 실행되는 문장(finally 블록)
}
```

- ArithmeticException: 연산오류 (division with 0)
- NullPointerException:
- ClassCastException
- OutOfMemoryError
- ArrayIndexOutOfBoundsException
- IllegalArgumentException
- IOException
- NumberFormatException
- InputMismatchException

## 객체지향

### 캡슐화

- 객체 외부에서는 비공개 멤버(필드, 메소드)에 직접 접근할 수 없음
- 객체 외부에서는 공개된 메소드를 통해 비공개 멤버 접근
- 객체 내 데이터에 대한 보호, 외부 접근 제한
- 접근 지정자
    - private: 해당 클래스만
    - protected: 같은 패키지 내의 모든 클래스/상속받은 자식 클래스
    - public: 모든 클래스에 접근 허용
    - default (생략가능): pacakge-private 라고도 함 (동일 패키지 내에서만 사용가능)

### 다형성

- 메소드 오버로딩 : 같은 이름이지만 다르게 작동하는 여러 메소드
- 메소드 오버라이딩 : 수퍼클래스의 메소드를 서브 클래스마다 다르게 구현

### 상속

상위 개체의 속성이 하위 개체에 물려줌

- 하위 객체가 상위 개체의 속성을 모두 가지는 관계
- 부모 클래스 : 수퍼(Super) 클래스
- 자식 클래스 : 서브(Sub) 클래스. 수퍼 클래스를 재사용하고 새로운 특성 추가
- 모든 클래스의 최상위 부모 클래스는 java.lang.Object

### 생성자

- 생성자 이름은 클래스 이름과 반드시 동일
- 생성자 여러 개 작성 가능 (오버로딩)
- 하나 이상 선언되어야 함, 없으면 기본 생성자
- 상속했을 때 생성자 호출 순서
    - 서브클래스 생성자에서 슈퍼클래스 생성자 호출하면 슈퍼클래스의 생성자 중 선택해서 호출가능
    - 슈퍼클래스 생성자 따로 호출하지 않아도 알아서 실행됨
    - 서브클래스 → 슈퍼클래스 모두 실행

### this

객체 자신에 대한 레퍼런스.

- 클래스 내의 다른 생성자 호출 가능
- 생성자 내에서만 사용 가능
- 반드시 생성자 코드의 제일 처음에 수행

### 추상 클래스

- 선언되어 있으나 구현되어 있지 않은 메소드, abstract로 선언
- 추상 메소드는 서브 클래스에서 오버라이딩하여 구현해야 함

### 인터페이스

- 클래스가 구현해야 할 메소드들이 선언되는 추상형
- 인터페이스의 객체 생성 불가
- 인터페이스 타입의 레퍼런스 변수 선언 가능
- implements 키워드로 구현하기

### 추상 클래스 VS 인터페이스?

- 유사점: 객체 생성 불가, 상속을 위한 슈퍼 클래스로 사용

|  | 목적 | 구성 |
| --- | --- | --- |
| 추상 클래스 | 추상 클래스에서 대부분 함수 구현, 서브 클래스에서만 구현 가능한 것을 abstract 하게 정의 | - 추상 메소드와 일반 메소드 모두 포함
- 상수, 변수 필드 모두 포함 |
| 인터페이스 | 단순한 뼈대로, 목적에 따라 상속 받은 클래스에서 인터페이스의 모든 추상 메소드를 구현함. | - 멤버 변수 포함 X
- 상수, 추상 메소드, 일반 메소드, default 메소드, static 메소드 모두 포함
- protected 접근 지정 선언 불가
- 다중 상속 지원  |

### 객체 생성 과정

C의 Pointer Structure와 유사.

- 객체에 대한 레퍼런스 변수 선언
- 객체 생성
- 클래스 타입 크기의 메모리 할당
- 객체 내 생성자 코드 실행

### 객체 Type Casting

- Upcasting able with implicit type casting
- Downcasting able with explicit type casting
- `instanceof` 키워드로 확인 가능

### 파라미터 전달 Call by Reference

객체 혹은 배열을 전달하는 경우 그 레퍼런스만 전달되는 것이지 객체/배열이 통째로 복사되어 전달되지 않음. 

### Method Overloading

메소드를 같은 이름으로 여러개 정의 but, 매개변수의 개수/타입이 서로 다르게 정의

### Garbage Collector

- Garbage: 레퍼런스가 하나도 없는 객체, 쓰레기
    
    JVM의 가비지 컬렉터가 자동으로 돎.
    
    가비지 컬렉션 스레드에 의해 수행.
    
    - 강제 가비지 컬렉션 가능 *System.gc

### Package

- 패키지
    - 관련 있는 클래스(compiled class)들을 저장하는 디렉토리 (폴더의 개념)
    
    자바 프로그램은 하나 이상의 패키지로 구성
    

### Static *Review required!

- static: 객체마다 생기는 것 아님, 클래스 당 하나만 생성돼 `클래스 멤버` 라고도 부름. 객체 생성 없이 사용 가능.
    - 객체 생성 전에 생성
    - 객체 생명주기와 무관
    - 프로그램이 종료되면 사라짐
- non-static: 일반적으로 알고 있는 Field/Method.
    - 객체 생성 시에 생성
    - 객체 사라지면 멤버도 사라짐
- static cannot access non-static member.
- static cannot use `this`

### final

- **final 클래스: 클래스 상속불가**
- final 메소드: 오버라이딩 불가
- final 필드: 상수