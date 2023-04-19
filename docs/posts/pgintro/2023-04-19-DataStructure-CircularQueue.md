---
layout: post
title: "자료구조 - Circular Queue: 폭풍전야"
category: CS
date: "2023-04-19"
---

### 시작하기 앞서
저번 Queue 글에 포함된 코드에 오류가 있더라고요. 제 글로 시험공부를 하는 바보같은 분들은 없으시겠죠? 큐가 빈 상태에서 enqueue를 하면 front와 rear를 모두 새로운 노드의 주소로 지정해야 한답니다.

### Linear Queue의 단점
Linear Queue의 경우에는 1차원 배열로 구현한 경우에 새로운 요소를 rear를 shifting 하면서 삽입하기 때문에 삽입 가능한 최대 크기까지 삽입하면 삭제한 요소들을 인덱스 0부터 시작하게 shift 해줘야한다.

<img src="@image/2023-04-19/lin_queue.gif">

### Circular Queue
이러한 단점을 보완하고자 Queue를 원형으로 만들었다. 원형으로 만들었기 때문에 기존에 선형으로 만들었을 때 생기는 문제를 해결할 수 있었다.

기본적으로 Linear Queue의 구조를 그대로 가져오되 그걸 원형으로 구부려놨다고 보면 된다.
- front: 첫번째 요소 하나 앞의 인덱스
- rear: 마지막 요소의 인덱스

### 포화와 공백상태
- 공백상태는 Lienar Queue와 마찬가지로 front == rear 이지만 NULL은 아닌 상태다.
- 포화상태는 `front % SIZE == (rear + 1) % SIZE` 으로 정의된다. 
  - (rear + 1) % SIZE 를 이용해 맨 뒤 요소의 바로 다음 요소가 front와 일치하는지 확인하므로, `(front - 1) % SIZE == rear % SIZE` 도 동작할 것이다. 
  - 이런 방식으로 인덱스를 달리해서 문제가 출제되기 좋다.
- Queue를 Initialize 할 때 `q->front = q->rear`를 0이 아닌 1로 주면 `SIZE - 1` 만큼의 가용한 공간을 갖게 된다.
```C
#define SIZE = 5;

void init_queue(QueueType *q) {
  q->front = q->rear = 0;
}

int is_full(QueueType *q) {
  return q->front % SIZE == (rear + 1) % SIZE;
}

int is_empty(QeueueType *q) {
  return q->front == q->rear;
}
```

### 삽입
삽입할 때는 포화상태가 아니면 기존 `rear`에 `1`을 더하고 `SIZE`로 나눈 나머지를 새로운 `rear`로 둔다. 그 다음 1차원 배열을 `rear`로 액세스해 값을 변경한다. 
```C
void enqueue(QueueType *q, element item) {
  if (is_full(q)) printError("Queue is full.");
  q->rear = (q->rear + 1) % SIZE;
  q->data[q->rear] = item;
}
```

### 제거
제거는 `front`를 1 증가시키고 그 위치의 데이터를 리턴한다. 처음에는 `front`가 1 증가되면 그 다음 요소가 반환되지 않을까 싶었는데, 매우 똑똑한 동기가 "어차피 front는 시작 요소의 인덱스보다 하나 적으니까 `+1` 하면 실제 그위치의 데이터겠지" 라고 하는 것을 듣고 원형 큐를 완벽히 이해해버렸다. 공백상태에 대해 적으면서도 와닿지 않았는데, 드디어 원형 큐가 와닿게 됐다.. 하지만 시험은 망할 예정이다 😇
```C
element dequeue(QueueType *q) {
  if (is_empty(q)) printError("Queue is empty.");
  q->front = (q->front + 1) % SIZE;
  return q->data[q->front];
}
```