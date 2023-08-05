---
layout: post
title: "자료구조 - Deque"
category: CS
date: "2023-04-19"
---

### 오류
CircularQueue에서 "`q->front = q->rear`를 0이 아닌 1로 주면 `SIZE - 1`" => "`q->front = q->rear`를 0이 아닌 1로 줘도 `SIZE - 1`"

### Deque
'덱' 이라고 읽는다. 그냥 Circular Queue에서 앞뒤에서 삽입/삭제가 모두 가능하게 만든 것 뿐이다.

### 포화와 공백상태
덱은 Circular Queue를 이용해 구현됐기 때문에 원형 큐와 동일하다.

### 삽입
- add_rear: Circular Queue의 enqueue
- add_front: 포화상태가 아니면 `front`에 데이터 삽입 (첫 요소의 앞으로서 비어있던 곳) 후 front 1 감소

### 제거
- delete_rear: Circular Queue의 dequeue
- delete_front: 공백상태가 아니면 `front` 1 증가 후 그 자리의 데이터 반환 (기존의 `front`는 빈 곳을 가리키고 있었지만, 새로운 `front`는 이전의 첫 요소를 가리키고 있음.)
