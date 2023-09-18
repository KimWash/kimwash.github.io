---
layout: post
title: "자료구조 - Tree: Start growin' a new tree in your heart"
category: CS
date: "2023-06-11 16:57:00"
---
리스트, 스택, 큐: 선형구조 ↔ 계층적인 구조를 나타내는 비선형 자료구조

부모-자식 관계의 노드로 이뤄짐. 

## 용어

- 노드: element, 구성요소
- 루트: parent가 없는 노드
- 서브트리: 하나의 노드와 그 노드의 children으로 이루어진 트리
- 단말노드: child가 없는 노드
- 비단말노드: 적어도 하나의 child를 갖는 노드
- sibling(형제), ancestor(조상), children(자손)…
- 레벨: 각 층의 번호 (root 부터 ascending)
- 높이: 최대 레벨
- 차수: 노드가 갖고 있는 **자식 노드의 개수**

## Binary Tree

- 모든 노드가 2개의 서브 트리를 갖고 있는 트리
    - 공집합일 수 있음
    - 최대 2개의 자식 노드가 존재
    - 모든 노드의 차수가 2 이하여서 구현하기 편리
    - **왼쪽 서브트리가 오른쪽 서브트리보다 우선순위**

### 검증

공집합이거나 루트/왼쪽서브트리/오른쪽서브트리 로 구성된 노드의 유한 집합, 서브트리들은 모두 이진트리. 

### 성질

- 노드가 `n` 개면 간선은 `n-1` 개
- 높이가 h인 이진트리: 최소 `h` 개, 최대 $`2^h-1`$ 개의 노드를 가짐
- `n` 개 노드의 이진트리 높이: 최대 `n` , 최소 $`\lceil log_2(n+1) \rceil`$

### 분류

- 포화 이진트리

트리의 각 레벨에 모든 노드가 꽉 차있는 이진트리, 각 노드에 번호를 붙일 수 있음

- 완전 이진 트리
    
    level `1` 부터 `k-1` 까지는 노드가 모두 채워져 있고 마지막 레벨 `k` 에서는 왼쪽부터 오른쪽으로 노드가 순서대로 채워져 있는 이진트리
    
    - 포화 이진트리와 노드 번호가 일치

### 표현법

- 배열 표현법
    
    모든 이진 트리를 포화 이진트리라고 가정, 각 노드에 번호 부여. 
    
    그 번호를 배열의 인덱스로 삼아 데이터를 배열에 저장. (없는 노드는 있다고 가정 후 번호 스킵)
    
    - 부모와 자식 인덱스 관계
        
        노드 `i` 의 부모 노드 인덱스: `i/2`
        
        노드 `i` 의 왼쪽 자식 인덱스: `2i`
        
        노드 `i` 의 오른쪽 자식 인덱스: `2i+1`
        
        * 부모/자식 노드에 접근하기 용이함!!
        

![Untitled](@image/2023-06-11/trees.png)

- 링크 표현법
    
    포인터를 이용,부모 노드가 자식 노드를 가리키게 하는 방법
    
    1. 노드는 구조체
    2. 링크는 포인터로 구현 (당연하지)
    
    ```c
    typedef struct TreeNode {
    	int data;
    	struct TreeNode *left, *right;
    } TreeNode;
    ```
    

### 이진 트리의 순회

- 순회: 트리의 노드들을 체계적으로 방문하는 것
    1. 전위순회: VLR 루트 → 왼쪽 → 오른쪽 (루트 후 자손 왼쪽부터) *루트부터
        - 전위순회를 이용한 메뉴 렌더링
            
            트리 구조의 메뉴를 row 별로 만들어보자!
            
            ```jsx
            function dfs(rows, prefixId, menu, prev, depth) {
                const postfix = '00'.repeat(3 - depth);
                if (!menu?.children) {
                    const row = {
                        ...prev,
                        id: `${prefixId}${menu.menuSeq.toString().padStart(2, '0')}${postfix}`,
                        useYn: menu.useYn === "Y",
                        [`depth${depth}`]: menu.menuNm,
                        firstDepth: prev.firstDepth ?? depth,
                        menuIds: [...(prev.menuIds ?? []), menu.menuId]
                    };
                    rows.push(row);
                    return;
                }
            
                for (let i = 0; i < menu.children.length; i++) {
                    let newPrev = {
                        menuIds: [...(prev.menuIds ?? []), menu.menuId],
                    };
                    if (i === 0) newPrev = {
                        ...prev,
                        [`depth${depth}`]: menu.menuNm,
                        firstDepth: prev.firstDepth ?? depth,
                        menuIds: [...(prev.menuIds ?? []), menu.menuId],
                    };
            
                    dfs(rows, `${prefixId}${menu.menuSeq?.toString().padStart(2, '0')}`, menu.children[i], newPrev, depth + 1);
                }
            }
            ```
            
    2. 중위순회: LVR 왼쪽 → 루트 → 오른쪽 *루트를 중간에
        1. 수식 트리
            
            (a*b) + (c/d) (중위식)
            
            ![Screenshot 2023-06-11 at 15.09.21.png](@image/2023-06-11/math_exp_tree.png)
            
    3. 후위순회: LRV 왼쪽 → 오른쪽 → 루트 (자손 왼쪽부터 순회 후 루트) *루트를 뒤에
        
        말단에서부터 올라오면서 순회해야 하는 경우 ex) 디렉토리 용량은 말단부터 합해야 하므로 후위순회 이용
        
        - 수식 트리의 후위식 표현: ( a b * ) ( c d / ) +
        
        ![Screenshot 2023-06-11 at 15.22.35.png](@image/2023-06-11/math_exp_tree_postfix.png)
        
    4. 레벨 순회: BFS로 각 노드를 레벨 순으로 순회, 큐 사용
        
        노드를 만날 때 마다 큐에서 하나를 dequeue 시킨 것을 출력, 왼쪽/오른쪽 노드를 enqueue
        
        ```c
        void level_order(TreeNode *ptr) {
        	QueueType q;
        	init_queue(&q);
        	if (ptr == NULL) return;
        	enqueue(&q, ptr);
        	while (!is_empty(&q)) {
        		ptr = dequeue(&q);
        		printf(" [%d] ", ptr->data);
        		if (ptr->left) enqueue(&q, ptr->left);
        		if (ptr->right) enqueue(&q, ptr->right);
        	}
        }
        ```
        

### 이진 트리의 연산

1. 노드 개수
    - 탐색 트리 안의 노드의 개수를 계산
    - 각각의 서브 트리에 대해 순환 호출 한 다음, 반환되는 값에 1을 더해 반환 (루트노드)
    
    ```c
    int get_node_count(TreeNode *node) {
    	// 전위 순회
    	int count = 0;
    	if (node != NULL) count = 1 + get_node_count(node->left) + get_node_count(node->right);
    	return count;
    }
    ```
    
2. 높이
    - 서브트리에 대하여 순환호출하고 서브트리들의 반환값 중에서 최댓값을 구하여 반환
    
    ```c
    int get_height(TreeNode *node) {
    	int height = 0;
    	if (node != NULL) {
    		height = 1 + max(get_height(node->left), get_height(node->right));
    	}
    	return height;
    }
    ```
    
3. 단말 노드 개수
    
    ```c
    int get_leaf_count(TreeNode *node) {
    	int count = 0;
    	if (node != NULL) {
    		if (node->left == NULL && node->right == NULL) // 단말노드 발견
    			return 1;
    		count = get_leaf_count(node->left) + get_leaf_count(node->right);
    	}
    	return count;
    }
    ```
    

## 스레드 이진 트리

- NULL 링크에 중위 순회 시에 후속 노드인 “중위 후속자" 를 저장시켜 놓은 트리
- 이진트리의 NULL 링크를 이용, 순환 호출 없이도 트리의 노드들을 순회 가능

```c
TreeNode *find_successor(TreeNode *p) {
	TreeNode *q = p->right;
	if (q == NULL || p->is_thread == TRUE) return q;
	while (q->left != NULL) q = q->left;
	return q;
}
```
![Thread_Binary_Tree](@image/2023-06-11/thread_binary_tree.gif)