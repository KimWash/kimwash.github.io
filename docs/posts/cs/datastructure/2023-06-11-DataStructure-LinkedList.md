---
layout: post
title: "자료구조 - LinkedList: 이럴거면 왜.."
category: CS
date: "2023-06-11 11:08:00"
---

사실 단순한 웹/앱 개발에서 연결 리스트는 쓸 일이 잘 없는 것 같다. 하지만 전공이기에.. 어디에서 쓰일지 모르기에.. 하는 김에 제대로 해두자!

### 리스트란?

사실 학부생이 되기 이전에는 리스트와 배열을 혼용해서 많이 썼다. 여러 언어들을 짬뽕해서 접했던 터라 더욱 혼란이 가중됐다. 사실 리스트는 배열을 이용해 구현할 수 있는 삽입/삭제/탐색 연산이 가능한 가장 간단한 자료구조였을 뿐이었다.

### ADT

- `insert(list, pos, item)` : `list` 의 `pos` 위치에 `item`을 삽입한다.
- `insert_last(list, item)` : `list` 의 맨 끝에 `item` 을 삽입한다.
- `insert_first(list, item)` : `list` 의 맨 처음에 `item` 을 삽입한다.
- `delete(list, pos)` : `list` 의 `pos` 위치의 요소를 제거한다.
- `clear(list)` : `list` 의 모든 요소를 제거한다.
- `get_entry(list, pos)` : `list` 에서 `pos` 위치의 요소를 반환한다.
- `get_length(list)` : `list`의 길이를 구한다.
- `is_empty(list)` : `list` 의 공백상태를 검사한다.
- `is_full(list)` : `list` 의 포화상태를 검사한다.
- `print_list(list)` : `list` 의 모든 요소를 출력한다.

### 구현 방법

1. 배열을 이용한 구현
    
    ![ezgif.com-video-to-gif.gif](@image/2023-06-11/list_array.gif)
    
    순차적인 메모리 공간이 할당되어 리스트의 순차적 표현이라고 한다.
    
    - 삽입: `pos` 인덱스부터 뒤로 밀어내고 `pos` 자리에 item 삽입
    
    ```c
    void insert(ArrayListType *list, int pos, element item) {
    	if (!is_full(list) && (pos >= 0) && (pos <= list->size) {
    		for (int i = (list->size - 1) i >= pos; i--)
    			list->array[i+1] = list->array[i];
    		list->array[pos] = item;
    		list->size++;
    	}
    }
    ```
    
    - 삭제: `pos` 인덱스로부터 제거하고 `pos+1` 인덱스부터 앞으로 당겨오기
    
    ```c
    element delete(ArrayListType *list, int pos) {
    	element item;
    	if (pos < 0 || pos >= list->size) error("위치 오류");
    	
    	item = list->array[pos];
    	for (int i = pos; i < (list->size - 1); i++)
    		list->array[i] = list->array[i+1];
    	list->size--;
    	return item;
    }
    ```
    
    - 초기화
    
    ```c
    void init(ArrayListType *list) { list->size = 0; }
    ```
    
    - 공백상태/포화상태 검사
    
    ```c
    int is_empty(ArrayListType *list) { return list->size == 0; }
    int is_full(ArrayListType *list) {return list->size == MAX_LIST_SIZE; }
    ```
    
    - 탐색
    
    ```c
    element get_entry(ArrayListType *list, int pos) {
    	if (pos < 0 || pos >= list->size) error("위치 오류");
    		return list->array[pos];
    }
    ```
    
2. 연결리스트를 이용한 구현
    
    ![연결 리스트의 삽입과 삭제](@image/2023-06-11/list_linked.gif)
    
    연결 리스트의 삽입과 삭제
    
    ![노드의 생성과 연결](@image/2023-06-11/list_linked_node.gif)
    
    노드의 생성과 연결
    
    - 리스트의 항목들을 노드에 저장(노드의 동적할당으로 구현)
    - 노드는 데이터/링크 필드로 구성
        - 데이터 필드: 노드의 데이터
        - 링크 필드: 다른 노드의 주소 값을 저장하는 포인터
    - 장점
        - 삽입/삭제가 보다 용이
        - 연속된 메모리 공간 필요 X
        - 크기 제한 X
    - 단점
        - 구현이 어렵다
        - 오류가 발생하기 쉽다
    
    ```c
    typedef int element;
    typedef struct ListNode {
    	element data;
    	struct ListNode *link;
    } ListNode;
    ```
    
    ```c
    ListNode *head = NULL;
    head = (ListNode *) malloc(sizeof(ListNode));
    head->data = 10;
    head->link = NULL;
    
    ListNode *p = (ListNode *) malloc(sizeof(ListNode));
    p->data = 20;
    p->link = NULL;
    
    head->link = p; // 연결
    ```
    
    - 삽입
    
    ```c
    ListNode* insert(ListNode *head, ListNode *pre, element value) {
    	ListNode *p = (ListNode *)malloc(sizeof(ListNode)); // (1) // 새로운 포인터 만들기
    	p->data = value; // 값 넣기
    	p->link = pre->link; // 넣을 것으로 가정, 이전 요소가 가르키는 요소의 주소를 넣을 요소가 가르키는 주소로 지정.
    	pre->link = p; // 이전 요소가 가르키는 주소를 넣을 요소의 주소로 지정.
      return head;
    }
    ```
    
    - 첫번째 삭제
    
    ```c
    // 기존의 첫번째 요소가 가르키는 주소를 새로운 첫번째 요소의 주소로 지정.
    // 기존의 첫번째 요소는 메모리 할당 해제.
    ListNode* delete_first(ListNode *head) {
    	ListNode *removed;
    	if (head == NULL) return NULL;
    	removed = head; // removed에 head의 주소 넣기
    	head = removed->link; // head는 removed가 가르키는 주소 넣기 (기존에 head가 가르키고 있던 주소, SLL의 첫 요소), SAME WITH head->link
    	free(removed); // 기존의 head는 free
    	return head;
    }
    ```
    
    - 삭제
    
    ```c
    ListNode* delete(ListNode *head, ListNode *pre) {
    	ListNode *removed;
    	removed = pre->link; // 삭제한 것으로 가정, 이전 요소의 주소는 지울 요소.
    	pre->link = removed->link // 지울 요소가 가르키고 있던 주소를 이전 요소가 가르키는 주소로 지정.
    	free(removed);
    	return head;
    }
    ```
    

### LinkedList를 이용한 스택 구현

아래와 같이 LinkedList를 이용해 스택을 구현할 수 있다.

```c
void push(LinkedStackType *s, element item) {
	StackNode *temp = (StackNode *)malloc(sizeof(StackNode)); 
	temp->data = item;
	temp->link = s->top;
	s->top = temp;
}
```

### constant pointer vs array name

constatnt pointer: 포인터가 바라보는 주소 값은 정할 수 없지만 포인터가 가리키는 데이터를 수정할 수 있다.

array 전체는 수정할 수 없지만 array 안에 들어있는 데이터를 수정할 수 있다.

- String Literal은 같은 문자열일 경우 같은 곳을 가르킨다.