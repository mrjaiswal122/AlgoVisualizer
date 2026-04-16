#include <iostream>
#include <stack>
#include <queue>
using namespace std;

int main() {
    // Stack (LIFO)
    cout << "── Stack (LIFO) ──\n";
    stack<int> s;
    s.push(10); s.push(20); s.push(30);
    cout << "Top: " << s.top() << "\n";
    cout << "Pop order: ";
    while (!s.empty()) { cout << s.top() << " "; s.pop(); }
    cout << "\n\n";

    // Queue (FIFO)
    cout << "── Queue (FIFO) ──\n";
    queue<int> q;
    q.push(10); q.push(20); q.push(30);
    cout << "Front: " << q.front() << "\n";
    cout << "Pop order: ";
    while (!q.empty()) { cout << q.front() << " "; q.pop(); }
    cout << "\n";
    return 0;
}
