---
layout: post
title: "프로그래밍입문 벼락치기 - 파스칼의 삼각형"
category: 프로그래밍입문
date: "2022-06-13"
---

### 아하! 이항계수!
파스칼의 삼각형은 고등학교 때에 이항계수에 대해 배울 때 처음 접했던 것이 기억난다. 맨 위에 1, 그 밑의 줄에 1과 1이 있는 채로 시작해 다음 줄은 1로 시작하고 1로 끝나되, 그 사이에는 위의 줄의 수를 두개씩 더해 추가하는 방식으로 진행된다. 예를 들면

1

1 1

1 2 1

1 3 3 1

1 4 6 4 1 

이런식이다. 이런 식으로 $(a+b)^n$의 각 항의 계수들을 나열하는 파스칼의 삼각형의 n번째 층을 구하려면 프로그래밍으로 어떻게 구현해야 할까? 아 참고로 $_nC_r$ 을 이용하면 되긴 하지만 사용하지 않을 것이다.

### 메인 아이디어
기본적인 아이디어는 층 구조에 집중하는 것이다. 층 수를 위에서부터 아래로 갈수록 커진다고 할때, 이차원 리스트 $a$에 [[1], [1, 1]]로 첫 두 층을 선언한다. 그러면 $i-1$번째 층의 데이터를 바탕으로 $i$번째 층을 만들어낼 수 있다. 이를 위해 $i$를 2부터 시작해, $n$까지 증가시키며 새로운 층들을 만들어주면 될 것 같다. 

그럴싸하지만 여기서 한층 더 생각을 해내야한다. 바로 인덱스다. 규칙을 보면 항상 j번째 ($j=0; j < a[i-1]$의 길이$-1$; $j++$)와 j+1번째 원소를 더한 것이 들어가는 새로운 층의 인덱스를 생각해보면 항상 j+1이다. 예를 들면, 세번째 1 2 1 층에서 $j=0$의 1과 $j=1$의 2를 더한 결과 3은 다음층 1 3 3 1 의 1번째 위치에 들어가게 된다.

근데 이렇게 구성하면 다음 층에 배정하는 인덱스가 1 ~ $a[i-1]$의 길이$-1$의 수를 갖게 되므로 0번째, 그리고 끝에 들어가는 1을 추가해주면 된다.

### 순서도
![파스칼의 삼각형 순서도](https://lh3.googleusercontent.com/pw/AM-JKLWe5I_U6mH6PqcihZKyjRjmpt2fYvijtKMDOzlkE7UpUW5StGPMmP9Crd_ovdbtBHQVYDXvvKnVTr3TQr7Qd8Tj_iSLOrLJLU4OVmtlxTHz6CVfaJTt-ef6LluSSvyo_BG-9ZMu29MoOsQwe5AdhuWrGQ=w1280-h891-no?authuser=0)

### 코드
```python
def pascalTriangle(height):
  triangle = [[1], [1,1]]
  for h in range(2, height): 
    currLevel = triangle[h-1]
    count = len(currLevel)
    nextLevel = [1] * (count + 1)
    for i in range(0, count-1):
      nextLevel[i+1] = currLevel[i] + currLevel[i+1]
    triangle.append(nextLevel)
  return triangle
```