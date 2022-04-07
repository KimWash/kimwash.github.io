---
layout: post
title: "프로그래밍입문 - 에라토스테네스의 체"
category: 프로그래밍입문
date: "2022-04-06"
---

### 아 이게 뭐였더라..?

중학교 때 소수를 구하는 방법으로 "에라토스테네스의 체"를 배운 적이 있다. 하지만 기억이 거의 나지 않아 다시 찾아보았다.
1은 제외한 다음 2,3,5,7을 제외한 각각의 배수를 모두 제외시키는게 가장 일반적으로 보이는 설명이다. 하지만 이것을 토대로 생각하면 효율적인 로직을 짜기 어렵다. 이것을 일반화해보자.
> 2부터 시작해 자기 자신을 제외한 자신의 배수들을 제외시킨다.

![에라토스테네스의 체 애니메이션](https://upload.wikimedia.org/wikipedia/commons/b/b9/Sieve_of_Eratosthenes_animation.gif)

### 어떻게 구현할까?
구하는 방법을 일반화한 이상 구현은 쉽다. 
1. 1부터 $n$까지의 수를 원소로 하는 리스트: list를 만든다.
2.  2부터 $\frac{n}{2}$까지의 수 $i$의 배수들 중 $i*j \leq n$ 인 수가 있는 list의 공간에 0을 대입한다. ($i*j \leq n$이면 $list[i*j]$에 0을 대입한다. )
3. list에서 0인 값을 모두 제거한다.

물론, 2부터 $\sqrt{n}$ 까지만 반복하면 더 효율적이고 잘 돌아간다. 하지만 교수님께서 $\frac{n}{2}$까지로 하라고 말씀하셔서 이렇게 해볼것이다.
### 프로그래밍으로 구현 - 순서도와 테스트 케이스 표
![enter image description here](https://lh3.googleusercontent.com/pw/AM-JKLXZ7iGe4P-ArNZIaMpj1cZRNGRp5xqlJFAf-eRnwqjFi3kaLveYx6On2eBezvsyOtx-50chydLIb931eBA51KjdEJ2uLgputWWq4Hr4to-vex7E_DOsolBAF4pJysX_pWOgfzVDctDemoPPK3NhKnVieQ=w1064-h747-no?authuser=0)
### 프로그래밍으로 구현 - 실제 코드
```python
# 에라토스테네스의 체

def generateList(n):
  numbers = []
  for i in range(1, n+1):
    numbers.append(i)
  return numbers

def eratos(a,n):
  for i in range(2, n // 2 + 1):
    j = 2
    while (i*j <= n):
      a[i*j - 1] = 0
      j += 1
  return a

def removeZeros(a):
  result = []
  for i in range(len(a)):
    if (a[i] != 0):
      result.append(a[i])
  return result

n = int(input("n: "))
numbers = removeZeros(eratos(generateList(n), n))
numbers.remove(1)
print(numbers)
```
### 일반화를 해야한다
수학적 법칙을 프로그래밍하게 쉽게 만드는 것은 생각보다 어려운 일이다. 하지만 동시에 꼭 해야하는 일이기도 하다. 최대한 문제를 추상적으로 보려는 노력이 필요한 이유이기도 하고, 이 것은 배우는 것이 아닌 훈련으로 만들어 지는 것을 느낄 수 있었다.