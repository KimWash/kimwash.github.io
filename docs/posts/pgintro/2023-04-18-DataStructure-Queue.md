---
layout: post
title: "자료구조 - Queue: 급한 불부터 끄기"
category: CS
date: "2023-04-18"
---

### 시작하기 앞서
올해 두번째 글이네요. 더욱 정진하겠습니다. 기다리는 분이 계시긴 하더라고요..? 재밌게..는 아니고 유익하게 읽어주세요.

<img src="@image/2023-04-18/queue.gif">

### Queue?
큐라는 것을 처음 들어본 것은 롤을 하면서였다. 매칭을 기디라는 것을 '큐잡는다' 라고 하는데, 그 이후로도 프로그래밍을 하다보면 큐는 자주 접하기 좋다. 2학년이 돼서 자료구조 강의를 들으며 C로 구현하는 Linear Queue에 대해 정리해보았다. Stack, LinkedList보다 우선하는 이유는 그냥 내일이 퀴즈라서 그렇다.

### ADT
Abstract Data Type으로, 추상적으로 데이터 타입을 정하는 하는 것이다. 앞으로 자료구조 관련 포스트에서는 설명을 생략한다. 

### Queue ADT
- 0개 이상의 요소들로 구성된 선형 리스트
- 연산
  - create(max_size) 최대 크기가 max_size인 empty queue 생성
  - init(q) queue q 초기화
  - is_empty(q)
  - is_full(q)
  - enqueue(q, e) 포화상태가 아니면 끝에 요소 e 추가
  - dequeue(q) 공백상태가 아니면 요소 제거
  - peek(q) q의 맨 앞에 있는 요소 반환

  LinkedQueue에서는 이 중 `init`, `is_empty`, `is_full`, `enqueue`, `dequeue` 만 구현한다. 

### LinkedQueue
이 포스트에서는 배열로는 구현하지 않을 것이다. 왜냐면 그냥 내일이 퀴즈기 때문이다. LinkedQueue는 LinkedList처럼 포인터를 이용해 구현된 Queue이다. LinkedQueue 구조체는 Queue의 맨앞과 맨뒤 요소의 주소를 참조해 맨뒤에 enqueue, 맨앞에 dequeue 시킬 수 있다.

### Initialize
어떤 것이든 초기화를 잘 해주도록 하자. PPT 모핑으로 만든 위의 애니메이션을 보면 공백상태일 때는 front와 rear가 모두 -1을 가리키고 있다. 포인터로 구현하면 당연히 Queue는 초기상태, 즉 공백상태에는 NULL을 바라보게 될 것이다.

### 포화와 공백상태
공백상태는 front == rear == NULL 인 상태이고, LinkedQueue로 구현하면 heap 영역이 허용하는 한도 내에서는 무한정 확장이 가능하므로 항상 포화상태가 아니다.
```c
int is_empty(LinkedQueueType *q) {
  return (q->front == NULL);
}
int is_full(LinkedQueueType *q) {
  return 0;
}
```

### 삽입
우선 Node를 동적할당 해준다. 그 다음에는 공백여부에 따라 갈리는데, 공백이면 새로운 노드를 front이자 rear 노드로 지정해준다. 공백이 아니면 현재 rear의 다음 노드로 지정해주고, 새로운 노드를 새로운 rear 노드로 지정해준다.

<img src="@image/2023-04-18/enqueue.gif">

```c
void enqueue(LinkedQueueType *q, element data) {
  QueueNode *temp = (QueueNode*) malloc(sizeof(QueueNode));
  if (is_empty(q) {
    temp->data = data;
    temp->link = NULL;
  }
  else {
    q->rear->link = temp;
    q->rear = temp;
  }
}
```

### 제거
제거는 삽입보다 더 간단하다. 그냥 데이터를 꺼내고, 새로운 front를 기존 front의 다음 노드로 지정해주고, 메모리 할당을 해제해주면 된다. 이때 새로 지정한 front가 NULL인 경우 공백상태이므로 rear 또한 NULL로 만들어준다.

<img src="@image/2023-04-18/dequeue.gif">

```c
element dequeue(LinkedQueueType *q) {
  QueueNode *temp = q->front;
  if (is_empty(q)) {
    error("Queue is Empty.");
  } else {
    element data;
    data = temp->data;
    q->front = q->front->link; // 다음 노드를 현재의 front 노드로 지정
    if (is_empty(q)) q->rear = NULL; // 공백으로 만들어주기.
    free(temp);
    return data;
  }
}
```