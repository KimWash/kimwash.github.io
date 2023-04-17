---
layout: post
title: "CS - 피보나치 수열"
category: CS
date: "2022-03-27"
---

### 어려워..

CS 수업에서 어려웠던 첫 번째 관문은 바로 피보나치 수열이다. 수열 자체는 간단하지만 구현하면서 알고리즘 공부를 평소에 안해 더 힘들었던 것 같다.

  

### 피보나치 수열?

피보나치 수열의 정의는 [위키피디아](https://ko.wikipedia.org/wiki/피보나치_수 "위키피디아")에 의하면,

> [수학](https://ko.wikipedia.org/wiki/%EC%88%98%ED%95%99 "수학")에서, **피보나치 수**([영어](https://ko.wikipedia.org/wiki/%EC%98%81%EC%96%B4 "영어"): Fibonacci numbers)는 첫째 및 둘째 항이 1이며 그 뒤의 모든 항은 바로 앞 두 항의 합인 [수열](https://ko.wikipedia.org/wiki/%EC%88%98%EC%97%B4 "수열")이다. 

정의에 입각해 피보나치 수열의 몇개 항을 구해보면..

$a_1=1$

$a_2=1$

$a_3=a_1+a_2=1+1=2$ 

$a_4=a_2+a_3=1+2=3$ 

...

$a_n=a_{n-2}+a_{n-1} (n\geq3)$ 으로, 첫항과 둘째항을 알면 $n$번째 항을 알 수 있는 점화식이 나온다.

### 프로그래밍으로 구현하기 위한 요소들과 로직
수열의 점화식이므로 제3항부터 제$n$항까지 구해가야한다. 전의 두 항을 담아 놓을 $a, b$와 두 항의 합 $f$가 필요하다. $a+b$ 를 $f$ 에 대입하고, $b$ 를 $a$ 에, $f$ 를 $b$ 에 대입해 다음 항을 구할 준비를 해주면 된다. 그러면 마지막에 구한 $n$번째 항은 $f$에 들어가 있을 것이다.

### 프로그래밍으로 구현해보자 - 순서도와 테스트 케이스 표
![순서도와 테스트 케이스 표](https://lh3.googleusercontent.com/pw/AM-JKLUqbUT5ddR19mkEMyvNpId41786Squ5M6eT26kXHFoJhz4CFijVtNPI7dZPDjanQTyDDl9TTEUEzx6RhslXEmQRDJ3Ya7mwMSzYgGVu6y5JKzosdNZp1ugifN589QdiVLkgy-XbCDJr2otY2-CDzVVpGA=w1117-h412-no?authuser=0)

### 프로그래밍으로 구현해보자 - 실제 코드
```python
def fibonacci(n):
	a,b,f = 1,1,1
	for i in range(2, n+1):
		f = a+b
		a = b
		b = f
	return f

print(fibonacci(6))
```

### 역시 프로그래밍은 데이터의 흐름
$a$와 $b$의 합을 $f$에 넣고 값들을 이동시켜 다음번 루프에서 사용할 수 있게끔 하는 것이 핵심인데, 이 대목에서 프로그래밍은 결국 데이터의 흐름이라는 것을 다시 한번 체감했다. 유클리드 호제법도 그렇고 피보나치 수열도 마찬가지로 복잡한 문제도 데이터의 흐름으로 생각하고, 테스트 케이스를 먼저 생각해보고 흐름의 패턴을 읽는 것이 중요하다는 생각도 든다. 