---
layout: post
title: "자료구조 - Stack: What's in my Stack?"
category: CS
date: "2023-04-19"
---

### 시작하기 앞서
저번 Queue 글에 포함된 코드에 오류가 있더라고요. 제 글로 시험공부를 하는 바보같은 분들은 없으시겠죠? 큐가 빈 상태에서 enqueue를 하면 front와 rear를 모두 새로운 노드의 주소로 지정해야 한답니다.

### Stack
Stack을 코딩하면서 처음 접한 것은 Flutter를 하면서다. CS에 대한 지식이 전무한 상태였고, '그냥 UI를 쌓나보다' 라고 막연하게 생각했다. 드디어 그 근본에 더 다가갈 기회가 생겼다.

### FIFO: First In, First Out.
선입선출의 개념으로, 스택은 먼저 삽입된 요소가 먼저 반출되는 자료구조이다. 

<img src="@image/2023-04-19/fifo.gif">

### ADT

- create(size) 최대 크기가 size인 공백 스택 생성
- is_full(s)
- is_empty(s)
- push(s, item)
- pop(s)
- peek(s)

### 배열을 이용한 구현
1차원 배열을 이용하면 스택을 간단히 구현할 수 있다. 가장 마지막에 들어온 요소의 index는 `top`으로 가리키므로 stack[0]은 첫 요소, stack[top]은 마지막 요소가 된다. 
공백상태의 경우 `top`은 `-1`로 정의한다.
```C
#define MAX_STACK_SIZE 100

typedef int element;
typedef struct {
  element data[MAX_STACK_SIZE];
  int top;
} StackType;

void init_stack(StackType *s) {
  s->top = -1;
}

int is_empty(StackType *s) {
  return s->top == -1;
}

int is_full(StackType *s) {
  return s->top == MAX_STACK_SIZE;
}

void push(StackType *s, element item) {
  if (is_full(s)) return;
  s->data[(s->top)++] = item;
}

int peek(StackType *s) {
  return s->data[--(s->top)];
}

void pop(StackType *s) {
  (s->top)--;
}
```

### 동적 배열 스택
동적 배열 스택의 경우 현재 크기를 정의하고 포화상태에서 삽입을 시도할 경우 크기를 키워주고 커진 크기에 맞게 재할당을 해주면 된다.
```C
typedef int element;
typedef struct {
  element *data;  // data는 포인터로 정의
  int capacity;   // 현재 크기
  int top;
}

void init_stack(StackType *s) {
  s->top = -1;
  s->capacity = 1;
  s->data = (element*) malloc(sizeof(element) * s->capacity);
}

void push(StackType *s, element item) {
  if (is_full(s)) {
    s->capacity *= 2;
    s->data = (element*) realloc(sizeof(element) * s->capacity);
  }
  s->data[(s->top)++] = item;
}

int is_full(StackType *s) {
  return s->top == s->capacity;
}

// 나머지(is_empty, peek, pop)는 동일
```