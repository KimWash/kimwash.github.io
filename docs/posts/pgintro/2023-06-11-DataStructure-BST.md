---
layout: post
title: "자료구조 - BST"
category: CS
date: "2023-06-11 16:58:30"
---
## 이진 탐색 트리

- key(왼쪽서브트리) < key(루트노드) < key(오른쪽서브트리)로, 왼쪽에는 루트보다 작은 값, 오른쪽에는 루트보다 큰 값을 갖는 자료구조이다.
- BST를 중위순회하면 정렬된 값을 얻을 수 있다.
- 탐색
    - BST 순환적인 탐색 하기
    
    ```c
    TreeNode *search(TreeNode *node, int key) {
    	if (node == NULL) return NULL; // 탐색 실패
    	if (key == node->key) return node; // 탐색 성공.
    	// 탐색하고자 하는 값이 더 작으면 왼쪽 서브트리에서 탐색, 아니면 오른쪽 서브트리에서 탐색
    	else if (key < node->key) return search(node->left, key);
    	else return search(node->right, key);
    }
    ```
    
    - BST 반복적인 탐색 하기
    
    ```c
    TreeNode *search_iterative(TreeNode *node, int key) {
    	while (node != NULL) {
    		if (key == node->key) return node;
    		else if (key < node->key) node = node->left;
    		else node = node->right;
    	}
    	return node;
    }
    ```
    
- 삽입
    - 먼저 삽입할 곳(탐색을 실패하는 위치)을 탐색해야함
    
    ```c
    TreeNode *insert_node(TreeNode *node, int key) {
    	if (node == NULL) return new_node(key); // NULL을 발견하면 그 자리를 new_node로 지정
    	if (key < node->key) node->left = insert_node(node->left, key);
    	else if (key > node->key) node->right = insert_node(node->right, key);
    	return node; // key == node->key 이면 그대로 반환, 아무 일도 일어나지 않을 것임
    }
    ```
    
- 삭제
    - 세가지 경우
        1. 삭제하려는 노드가 단말
            
            부모노드를 찾아서 연결을 끊음
            
        2. 삭제하려는 노드가 왼쪽이나 오른쪽 서브 트리 중 하나만 갖고 있는 경우
            
            그 노드는 삭제하고 서브트리가 존재하면 부모 노드에 붙여줌
            
        3. 삭제하려는 노드가 두개의 서브 트리 모두 갖고 있는 경우
            
            가장 비슷한 값을 가진 노드를 삭제 노드 위치로 가져옴
            
            *비슷한 값: 왼쪽 서브 트리에서 제일 큰 값 or 오른쪽 서브트리에서 제일 작은 값
            
    
    ```c
    TreeNode *min_value_node(TreeNode *node) {
    	TreeNode *current = node;
    	while (current->left != NULL) current = current->left;
    	return current;
    }
    
    TreeNode *delete_node(TreeNode *root, int key) {
    	if (root == NULL) return root;
    	// 탐색
    	if (key < root->key) root->left = delete_node(root->left, key);
    	else if (key > root->key) root->right = delete_node(root->right, key);
    	else {
    		// 삭제할 값 찾음
    		if (root->left == NULL) {
    			TreeNode *temp = root->right;
    			free(root);
    			return temp; // temp를 반환해주면서 기존의 root->right 를 해당 노드로 지정되게 함
    		} else if (root->right == NULL) {
    			TreeNode *temp = root->left;
    			free(root);
    			return temp;
    		}
    		// 오른쪽 서브트리 내부에서 가장 작은 값을 찾는다.
    		TreeNode *temp = min_value_node(root->right);
    		root->key = temp->key;
    		root->right = delete_node(root->right, temp->key); // min_value_node를 찾아서 제거한 서브트리를 root->right 로 지정
    	**}**
    	return root;
    }
    ```
    
- 성능: 탐색/삽입/삭제 연산의 복잡도는 트리의 높이 h에 비례.
    - 최선의 경우 (이진 트리가 균형적으로 생성돼있는 경우)
        - 높이 h =$\lceil{log_2n}\rceil$
    - 최악의 경우 (한쪽으로 치우친 경사이진트리의 경우)
        - 높이 h = $n$ 으로, 순차탐색과 같은 시간복잡도를 가짐