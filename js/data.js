const TOPICS = {
  graph: {
    name: 'Graph BFS / DFS', cat: 'Graphs', icon: 'bi-diagram-3-fill',
    desc: 'Run BFS and DFS on an interactive graph and watch nodes get explored.',
    time: 'O(V + E)', space: 'O(V)', file: 'graph.cpp',
    code: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

class Graph {
    int V;
    vector<vector<int>> adj;
public:
    Graph(int V) { this->V = V; adj.resize(V); }

    void addEdge(int v, int w) {
        adj[v].push_back(w);
        adj[w].push_back(v);
    }

    void BFS(int s) {
        vector<bool> visited(V, false);
        queue<int> q;
        visited[s] = true; q.push(s);
        while (!q.empty()) {
            s = q.front(); q.pop();
            cout << s << " ";
            for (auto u : adj[s])
                if (!visited[u]) { visited[u] = true; q.push(u); }
        }
    }

    void DFSUtil(int v, vector<bool>& vis) {
        vis[v] = true; cout << v << " ";
        for (int i : adj[v]) if (!vis[i]) DFSUtil(i, vis);
    }

    void DFS(int v) {
        vector<bool> visited(V, false);
        DFSUtil(v, visited);
    }
};

int main() {
    Graph g(6);
    g.addEdge(0,1); g.addEdge(0,2);
    g.addEdge(1,3); g.addEdge(1,4);
    g.addEdge(2,4); g.addEdge(2,5);
    cout << "BFS: "; g.BFS(0);
    cout << "\\nDFS: "; g.DFS(0);
    return 0;
}`
  },

  dijkstra: {
    name: "Dijkstra's Algorithm", cat: 'Graphs', icon: 'bi-alt',
    desc: 'Shortest path algorithm for weighted graphs using a priority queue.',
    time: 'O(E log V)', space: 'O(V)', file: 'dijkstra.cpp',
    code: `#include <iostream>
#include <vector>
#include <queue>
#include <climits>
using namespace std;

typedef pair<int, int> iPair;

void dijkstra(int src, int V, vector<vector<iPair>>& adj) {
    priority_queue<iPair, vector<iPair>, greater<iPair>> pq;
    vector<int> dist(V, INT_MAX);
    pq.push({0, src});
    dist[src] = 0;

    while (!pq.empty()) {
        int u = pq.top().second;
        pq.pop();
        for (auto x : adj[u]) {
            int v = x.first, weight = x.second;
            if (dist[v] > dist[u] + weight) {
                dist[v] = dist[u] + weight;
                pq.push({dist[v], v});
            }
        }
    }
}

int main() {
    return 0;
}`
  },

  astar: {
    name: 'A* Search', cat: 'Pathfinding', icon: 'bi-signpost-split-fill',
    desc: 'Visualizing A* Search on a grid using Manhattan distance heuristic.',
    time: 'O(E log V)', space: 'O(V)', file: 'astar.cpp',
    code: `#include <iostream>
#include <vector>
#include <queue>
#include <cmath>

struct Node {
    int x, y, g, h;
    Node* parent;
    int f() const { return g + h; }
};

struct Compare {
    bool operator()(Node* a, Node* b) { return a->f() > b->f(); }
};

int heuristic(int x1, int y1, int x2, int y2) {
    return std::abs(x1 - x2) + std::abs(y1 - y2);
}

void aStar(int startX, int startY, int endX, int endY) {
    std::priority_queue<Node*, std::vector<Node*>, Compare> open;
    // Core A* loop...
}

int main() {
    std::cout << "A* Pathfinder Ready." << std::endl;
    return 0;
}`
  },

  sorting: {
    name: 'Sorting Algorithms', cat: 'Arrays', icon: 'bi-bar-chart-fill',
    desc: 'Compare Bubble Sort (O(n²)) and Merge Sort (O(n log n)) with live animations.',
    time: 'O(n log n)', space: 'O(n)', file: 'sorting.cpp',
    code: `#include <iostream>
#include <vector>
using namespace std;

void merge(vector<int>& arr, int l, int m, int r) {
    int n1 = m - l + 1, n2 = r - m;
    vector<int> L(n1), R(n2);
    for (int i = 0; i < n1; i++) L[i] = arr[l + i];
    for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];
    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void mergeSort(vector<int>& arr, int l, int r) {
    if (l >= r) return;
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
}

int main() {
    vector<int> arr = {64, 34, 25, 12, 22, 11, 90};
    mergeSort(arr, 0, arr.size() - 1);
    for (int x : arr) cout << x << " ";
    return 0;
}`
  },

  linkedlist: {
    name: 'Linked List', cat: 'Linear DS', icon: 'bi-link-45deg',
    desc: 'A linear structure where elements are linked using pointers.',
    time: 'O(n) Search', space: 'O(n)', file: 'linkedlist.cpp',
    code: `#include <iostream>
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
        cout << "NULL" << endl;
    }
};

int main() {
    LinkedList list;
    list.append(10); list.append(20); list.append(30);
    list.display();
    return 0;
}`
  },

  stackqueue: {
    name: 'Stack & Queue', cat: 'Linear DS', icon: 'bi-layers-fill',
    desc: 'LIFO (Stack) vs FIFO (Queue) using C++ STL containers.',
    time: 'O(1) Push/Pop', space: 'O(n)', file: 'stack_queue.cpp',
    code: `#include <iostream>
#include <stack>
#include <queue>
using namespace std;

int main() {
    // Stack (LIFO)
    stack<int> s;
    s.push(10); s.push(20); s.push(30);
    cout << "Stack top: " << s.top() << "\\n";
    while (!s.empty()) { cout << s.top() << " "; s.pop(); }
    cout << "\\n\\n";

    // Queue (FIFO)
    queue<int> q;
    q.push(10); q.push(20); q.push(30);
    cout << "Queue front: " << q.front() << "\\n";
    while (!q.empty()) { cout << q.front() << " "; q.pop(); }
    cout << "\\n";
    return 0;
}`
  },

  bst: {
    name: 'Binary Search Tree', cat: 'Trees', icon: 'bi-diagram-2-fill',
    desc: 'Left subtree keys are smaller; right subtree keys are larger.',
    time: 'O(log n) Avg', space: 'O(n)', file: 'bst.cpp',
    code: `#include <iostream>
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
    void inorder()     { inorder(root); cout << "\\n"; }
};

int main() {
    BST tree;
    for (int v : {50, 30, 70, 20, 40, 60, 80}) tree.insert(v);
    cout << "Inorder: "; tree.inorder();
    return 0;
}`
  }
};
