#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

class LinkedList {
    Node* head;
public:
    LinkedList() : head(nullptr) {}

    void append(int val) {
        Node* n = new Node(val);
        if (!head) { head = n; return; }
        Node* t = head;
        while (t->next) t = t->next;
        t->next = n;
    }

    void remove(int key) {
        Node *t = head, *prev = nullptr;
        if (t && t->data == key) { head = t->next; delete t; return; }
        while (t && t->data != key) { prev = t; t = t->next; }
        if (!t) return;
        prev->next = t->next; delete t;
    }

    void display() {
        Node* t = head;
        while (t) { cout << t->data << " -> "; t = t->next; }
        cout << "NULL\n";
    }

    ~LinkedList() {
        Node* t = head;
        while (t) { Node* nxt = t->next; delete t; t = nxt; }
    }
};

int main() {
    LinkedList list;
    list.append(10); list.append(20); list.append(30);
    list.display();   // 10 -> 20 -> 30 -> NULL
    list.remove(20);
    list.display();   // 10 -> 30 -> NULL
    return 0;
}
