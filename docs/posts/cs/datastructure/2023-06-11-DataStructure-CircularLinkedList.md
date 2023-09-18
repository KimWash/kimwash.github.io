---
layout: post
title: "자료구조 - Circular LinkedList: 빙글빙글"
category: CS
date: "2023-06-11 13:48:00"
---

- 마지막 노드의 링크가 첫 번째 노드를 가리키는 리스트
- 한 노드에서 다른 모든 노드로 접근 가능
- 헤드포인터가 마지막 노드를 가리키게끔 구성해 리스트의 처음/마지막에 노드를 삽입하는 연산 용이
- 처음에 삽입
    
    ![ezgif.com-video-to-gif-4.gif](@image/2023-06-11/list_linked_circular_insert_first.gif)
    
    ```c
    ListNode* insert_first(ListNode* head, element data) {
    	ListNode *node = (ListNode *)malloc(sizeof(ListNode));
    	node->data = data;
    	if (head == NULL) {
    		// 공백상태
    		head = node;
    		node->link = head;
    	}
    	else {
    		node->link = head->link;
    		head->link = node;
    	}
    	return head;
    }
    ```
    
- 끝에 삽입
    
    ![ezgif.com-video-to-gif-5.gif](@image/2023-06-11/list_linked_circular_insert_end.gif)
    
    ```c
    ListNode* insert_last(ListNode* head, element data) {
    	ListNode *node = (ListNode *) malloc(sizeof(ListNode));
    	node->data = data;
    	if (head == NULL) {
    		head = node;
    		node->link = head;
    	}
    	else {
    		node->link = head->link;
    		head->link = node;
    		head = node;
    	}
    	return head;
    }
    ```
    
- 원형 연결 리스트를 이용해 원형 큐 개발도 가능