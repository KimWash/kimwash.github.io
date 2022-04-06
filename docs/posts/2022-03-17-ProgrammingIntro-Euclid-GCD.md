### 유클리드 호제법?

유클리드 호제법은 위키피디아에 따르면

> **유클리드 호제법**(-互除法, Euclidean algorithm) 또는 **유클리드 알고리즘**은 2개의 [자연수](https://ko.wikipedia.org/wiki/%EC%9E%90%EC%97%B0%EC%88%98  "자연수") 또는 정식(整式)의 [최대공약수](https://ko.wikipedia.org/wiki/%EC%B5%9C%EB%8C%80%EA%B3%B5%EC%95%BD%EC%88%98  "최대공약수")를 구하는 [알고리즘](https://ko.wikipedia.org/wiki/%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98  "알고리즘")의 하나

로, 유클리드 호제법에 따르면, $a$>$b$일 때 $b$의 값을 $a$ mod $b$ 의 결과값으로 나눠주는 것을 반복하다 나눈 나머지가 0이 됐을 때의 $b$를가 바로 최대공약수이다.
### 구현방법
원리는 간단하다. $r$에 $a$ mod $b$를 , $a$에 $b$를, $b$에 $r$을  대입한다. 이렇게 되면 다음 루프에서도 나머지값이 $b$ 자리에, 기존 $b$ 값이 $r$자리로 들어가 $b$의 값을 $a$ mod $b$의 결과값으로 나눌 수 있게 된다.
### 프로그래밍으로 구현 - 순서도와 테스트 케이스 표
![enter image description here](https://lh3.googleusercontent.com/pw/AM-JKLXzt8QvZl12BSq7JKR0ZF5RQrisCk8SRDoZTA6wr-_lsTZ4Y95d09YIfjnLFMbBw4C8jPuMsnZdRKZAtPFe5VkytQeRCIQ5j_X7Vhu_l5xNgAZnZ-xEY8zL_qc_ORWdnRLpBzOcg3YLq5Dqj7rLi0n_Vw=w1117-h680-no?authuser=0)
### 프로그래밍으로 구현 - 실제 코드
```python
def gcdEuclid(a, b):
  r = a % b
  while r != 0:
    r = a % b
    a = b
    b = r
  return a

print(gcdEuclid(12,18))
```