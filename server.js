const express = require('express');
const path = require('path');
const app = express();
const PORT = 3001;

// Serve static files
app.use(express.static(path.join(__dirname)));

// API endpoints
app.get('/api/topics', (req, res) => {
  // Import the topics from data.js or define them
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
    cout << endl << "DFS: "; g.DFS(0);
    return 0;
}`
    },
    dijkstra: {
      name: "Dijkstra's Algorithm", cat: 'Graphs', icon: 'bi-alt',
      desc: 'Finds the shortest path between nodes in a weighted graph.',
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
    cout << "Dijkstra Initialized." << endl;
    return 0;
}`
    },
    astar: {
      name: 'A* Search', cat: 'Pathfinding', icon: 'bi-signpost-split-fill',
      desc: 'Heuristic-based pathfinding that finds the shortest path efficiently.',
      time: 'O(E)', space: 'O(V)', file: 'astar.cpp',
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

void aStar(int startX, int startY, int targetX, int targetY) {
    std::priority_queue<Node*, std::vector<Node*>, Compare> openSet;
    // Implementation of A* logic goes here...
}

int main() {
    std::cout << "A* Algorithm initialized..." << std::endl;
    return 0;
}`
    },
    // Add other topics similarly
    sorting: {
      name: 'Sorting Algorithms', cat: 'Arrays', icon: 'bi-bar-chart-fill',
      desc: 'Visualize various sorting algorithms like Bubble Sort and Merge Sort.',
      time: 'O(n log n)', space: 'O(n)', file: 'sorting.cpp',
      code: `#include <iostream>
#include <vector>
using namespace std;

void merge(vector<int>& arr, int l, int m, int r) {
    int n1 = m - l + 1, n2 = r - m;
    vector<int> L(n1), R(n2);
    for(int i=0; i<n1; i++) L[i] = arr[l+i];
    for(int j=0; j<n2; j++) R[j] = arr[m+1+j];
    int i=0, j=0, k=l;
    while(i<n1 && j<n2) arr[k++] = (L[i] <= R[j]) ? L[i++] : R[j++];
    while(i<n1) arr[k++] = L[i++];
    while(j<n2) arr[k++] = R[j++];
}

void mergeSort(vector<int>& arr, int l, int r) {
    if (l >= r) return;
    int m = l + (r-l)/2;
    mergeSort(arr, l, m);
    mergeSort(arr, m+1, r);
    merge(arr, l, m, r);
}`
    },
    linkedlist: {
      name: 'Linked List', cat: 'Linear DS', icon: 'bi-link-45deg',
      desc: 'Operations on linked lists.',
      time: 'O(1) to O(n)', space: 'O(n)', file: 'linkedlist.cpp',
      code: '// Linked list code here'
    },
    stackqueue: {
      name: 'Stack & Queue', cat: 'Linear DS', icon: 'bi-layers-fill',
      desc: 'Stack and queue operations.',
      time: 'O(1)', space: 'O(n)', file: 'stack_queue.cpp',
      code: '// Stack queue code here'
    },
    bst: {
      name: 'Binary Search Tree', cat: 'Trees', icon: 'bi-diagram-2-fill',
      desc: 'BST operations.',
      time: 'O(log n)', space: 'O(n)', file: 'bst.cpp',
      code: '// BST code here'
    }
  };
  res.json(TOPICS);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});