#include <iostream>
using namespace std;

struct Node {
    int key;
    Node *left, *right;
    Node(int k) : key(k), left(nullptr), right(nullptr) {}
};

class BST {
    Node* root;
    Node* insert(Node* node, int key) {
        if (!node) return new Node(key);
        if (key < node->key) node->left  = insert(node->left,  key);
        else if (key > node->key) node->right = insert(node->right, key);
        return node;
    }
    void inorder(Node* r) {
        if (!r) return;
        inorder(r->left); cout << r->key << " "; inorder(r->right);
    }
public:
    BST() : root(nullptr) {}
    void insert(int k) { root = insert(root, k); }
    void inorder()     { inorder(root); cout << "\n"; }
};

int main() {
    BST tree;
    for (int v : {50, 30, 70, 20, 40, 60, 80}) tree.insert(v);
    cout << "Inorder: "; tree.inorder();
    return 0;
}
