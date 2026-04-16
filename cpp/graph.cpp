#include <iostream>
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
    cout << "BFS from 0: "; g.BFS(0);
    cout << "\nDFS from 0: "; g.DFS(0);
    cout << "\n";
    return 0;
}
