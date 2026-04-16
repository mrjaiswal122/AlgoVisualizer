const GRAPH_NODES = [
  {id:0,cx:200,cy:55}, {id:1,cx:80, cy:145},
  {id:2,cx:320,cy:145},{id:3,cx:80, cy:280},
  {id:4,cx:200,cy:280},{id:5,cx:320,cy:280}
];
const GRAPH_EDGES = [[0,1],[0,2],[1,3],[1,4],[2,4],[2,5]];
const GRAPH_ADJ   = {0:[1,2],1:[0,3,4],2:[0,4,5],3:[1],4:[1,2],5:[2]};

let gVisited = new Set(), gCurrent = null, gLog = [];

function buildGraphHTML() {
  return `
  <div class="viz-controls">
    <button class="btn btn-primary-viz" onclick="runBFS()"><i class="bi bi-play-fill"></i> BFS</button>
    <button class="btn btn-secondary-viz" onclick="runDFS()"><i class="bi bi-play-fill"></i> DFS</button>
    <button class="btn btn-reset" onclick="resetGraph()"><i class="bi bi-arrow-counterclockwise"></i> Reset</button>
  </div>
  <div class="viz-body">
    <div id="graph-canvas">
      <svg id="graph-svg" width="400" height="320" style="overflow:visible"></svg>
    </div>
    <div id="exec-log">
      <h6>Execution Log</h6>
      <div id="log-entries"><span style="font-size:.75rem;font-style:italic;color:#6b7280">Waiting...</span></div>
    </div>
  </div>`;
}

function drawGraph() {
  const svg = document.getElementById('graph-svg');
  if (!svg) return;
  let html = '';
  GRAPH_EDGES.forEach(([u, v]) => {
    const nu = GRAPH_NODES.find(n => n.id === u);
    const nv = GRAPH_NODES.find(n => n.id === v);
    const traversed = gVisited.has(u) && gVisited.has(v);
    html += `<line x1="${nu.cx}" y1="${nu.cy}" x2="${nv.cx}" y2="${nv.cy}"
      stroke="${traversed ? 'rgba(124,58,237,0.8)' : '#1e2d45'}"
      stroke-width="${traversed ? 3 : 2}" style="transition:all .4s"/>`;
  });
  GRAPH_NODES.forEach(n => {
    const isCurrent = gCurrent === n.id;
    const isVisited = gVisited.has(n.id);
    const fill   = isCurrent ? '#7c3aed' : isVisited ? 'rgba(124,58,237,0.18)' : '#111827';
    const stroke = isCurrent ? '#a78bfa' : isVisited ? '#7c3aed' : '#1e2d45';
    const filter = isCurrent ? 'filter:drop-shadow(0 0 10px rgba(124,58,237,0.6))' : '';
    const textFill = isCurrent ? '#fff' : isVisited ? '#a78bfa' : '#94a3b8';
    html += `<g style="transition:all .3s">
      <circle cx="${n.cx}" cy="${n.cy}" r="24" fill="${fill}" stroke="${stroke}"
        stroke-width="${isCurrent ? 3 : 2}" style="${filter};transition:all .3s"/>
      <text x="${n.cx}" y="${n.cy}" text-anchor="middle" dominant-baseline="central"
        fill="${textFill}" style="font-family:'Fira Code',monospace;font-size:1rem;font-weight:700">${n.id}</text>
    </g>`;
  });
  svg.innerHTML = html;
}

function updateLog() {
  const el = document.getElementById('log-entries');
  if (!el) return;
  el.innerHTML = gLog.length === 0
    ? '<span style="font-size:.75rem;font-style:italic;color:#6b7280">Waiting...</span>'
    : gLog.map(e => `<div class="log-entry">&gt; ${e}</div>`).join('');
  el.scrollTop = el.scrollHeight;
}

function resetGraph() {
  stopAll();
  setTimeout(() => { gVisited = new Set(); gCurrent = null; gLog = []; drawGraph(); updateLog(); }, 60);
}

async function graphVisitNode(id) {
  if (window._aborted) return;
  gCurrent = id; drawGraph();
  await sleep(650);
  if (window._aborted) return;
  gVisited.add(id); gCurrent = null;
  gLog.push(`Visited Node ${id}`);
  drawGraph(); updateLog();
}

async function runBFS() {
  if (window._running) return;
  resetGraph(); await sleep(80);
  window._running = true;
  const queue = [0], local = new Set([0]);
  while (queue.length && !window._aborted) {
    const u = queue.shift();
    await graphVisitNode(u);
    for (const v of GRAPH_ADJ[u])
      if (!local.has(v)) { local.add(v); queue.push(v); }
  }
  window._running = false;
}

async function runDFS() {
  if (window._running) return;
  resetGraph(); await sleep(80);
  window._running = true;
  const local = new Set();
  async function dfs(u) {
    if (window._aborted) return;
    local.add(u); await graphVisitNode(u);
    for (const v of GRAPH_ADJ[u]) if (!local.has(v)) await dfs(v);
  }
  await dfs(0);
  window._running = false;
}
