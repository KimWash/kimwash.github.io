---
layout: post
title: "자료구조 - Double Linked List"
category: CS
date: "2023-06-11 15:01:00"
---

- 하나의 노드가 선행 노드와 후속 노드에 대한 두 개의 링크를 가지는 리스트
- 선행 노드 참조가 가능
- 공간을 많이 차지하고 코드가 복잡
- 헤드 노드: 데이터를 가지지 않고 오직 삽입/삭제 코드를 간단하게 할 목적으로 만들어진 노드
    - 헤드 포인터와 상이
    - 공백 상태에서는 헤드 노드만 존재
- 노드 구조
    
    ```c
    typedef int element;
    typedef struct DListNode {
    	element data;
    	struct DListNode *llink;
    	struct DListNode *rlink;
    } DListNode;
    ```
    
- 삽입
    
    ![ezgif.com-video-to-gif-6.gif](@image/2023-06-11/dll_insert.gif)
    
    ```c
    void dinsert(DListNode *before, element data) {
    	DListNode *newnode = (DListNode*) malloc(sizeof(DListNode));
    	strcpy(newnode->data, data); // newnode->data에 data 복사
    	newnode->llink = before;     // newnode의 좌우를 각각 기존 노드와 기존 노드의 오론쪽 노드로 지정
    	newnode->rlink = before->rlink;
    	before->rlink->llink = newnode; // before->rlink->llink: 기존 노드의 오른쪽 노드의 왼쪽 노드: 원래는 before 겠지만 이젠 newnode!!
    	before->rlink = newnode;
    }
    ```
    
- 삭제
    
    ![ezgif.com-video-to-gif-7.gif](@image/2023-06-11/dll_remove.gif)
    
    ```c
    void ddelete(DListNode *head, DListNode* removed) {
    	if (removed == head) return; // 헤드와 지울게 같으면 지울 수 없음.
    	removed->llink->rlink = removed->rlink; // removed의 왼쪽 노드의 오른쪽 노드는 원래 removed였지만 삭제할 것이기 때문에 removed->right로 대체
    	removed->rlink->llink = removed->llink; // 윗줄과 마찬가지
    	free(removed);
    }
    ```