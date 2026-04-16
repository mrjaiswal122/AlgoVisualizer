const D_NODES = [
  {id:0,cx:200,cy:45}, {id:1,cx:80, cy:120},
  {id:2,cx:320,cy:120},{id:3,cx:80, cy:250},
  {id:4,cx:200,cy:250},{id:5,cx:320,cy:250}
];
const D_EDGES = [
  {u:0,v:1,w:4}, {u:0,v:2,w:1}, {u:1,v:3,w:1}, 
  {u:1,v:4,w:3}, {u:2,v:4,w:2}, {u:2,v:5,w:5},
  {u:4,v:3,w:2}, {u:4,v:5,w:1}
];
const D_ADJ = {0:[[1,4],[2,1]],1:[[0,4],[3,1],[4,3]],2:[[0,1],[4,2],[5,5]],3:[[1,1],[4,2]],4:[[1,3],[2,2],[3,2],[5,1]],5:[[2,5],[4,1]]};

let dVisited = new Set(), dCurrent = null, dLog = [], dDist = {0:0,1:Infinity,2:Infinity,3:Infinity,4:Infinity,5:Infinity};

function buildDijkstraHTML() {
  return `
  <div class="viz-controls">
    <button class="btn btn-primary-viz" onclick="runDijkstra()"><i class="bi bi-play-fill"></i> Run Dijkstra</button>
    <button class="btn btn-reset" onclick="resetDijkstra()"><i class="bi bi-arrow-counterclockwise"></i> Reset</button>
  </div>
  <div class="viz-body">
    <div id="graph-canvas">
      <svg id="dijkstra-svg" width="400" height="320" style="overflow:visible"></svg>
    </div>
    <div id="exec-log">
      <h6>Distances</h6>
      <div id="d-log-entries"></div>
    </div>
  </div>`;
}

function drawDijkstra() {
  const svg = document.getElementById('dijkstra-svg');
  if (!svg) return;
  let html = '';
  D_EDGES.forEach(({u,v,w}) => {
    const nu = D_NODES.find(n => n.id === u), nv = D_NODES.find(n => n.id === v);
    html += `<line x1="${nu.cx}" y1="${nu.cy}" x2="${nv.cx}" y2="${nv.cy}" stroke="#1e2d45" stroke-width="2"/>
             <text x="${(nu.cx+nv.cx)/2}" y="${(nu.cy+nv.cy)/2 - 5}" fill="#6b7280" font-size="0.7rem" font-family="Fira Code">${w}</text>`;
  });
  D_NODES.forEach(n => {
    const isCurrent = dCurrent === n.id, isVisited = dVisited.has(n.id);
    const fill = isCurrent ? '#7c3aed' : isVisited ? 'rgba(34,197,94,0.15)' : '#111827';
    const stroke = isCurrent ? '#a78bfa' : isVisited ? '#22c55e' : '#1e2d45';
    html += `<g>
      <circle cx="${n.cx}" cy="${n.cy}" r="22" fill="${fill}" stroke="${stroke}" stroke-width="2"/>
      <text x="${n.cx}" y="${n.cy}" text-anchor="middle" dominant-baseline="central" fill="white" font-weight="700">${n.id}</text>
      <text x="${n.cx}" y="${n.cy+35}" text-anchor="middle" fill="${isVisited?'#22c55e':'#94a3b8'}" font-size="0.75rem" font-family="Fira Code">d=${dDist[n.id]===Infinity?'∞':dDist[n.id]}</text>
    </g>`;
  });
  svg.innerHTML = html;
}

function updateDLog() {
  const el = document.getElementById('d-log-entries');
  if (!el) return;
  el.innerHTML = D_NODES.map(n => `<div class="log-entry" style="color:${dVisited.has(n.id)?'#22c55e':''}">Node ${n.id}: ${dDist[n.id]===Infinity?'∞':dDist[n.id]}</div>`).join('');
}

function resetDijkstra() {
  stopAll();
  setTimeout(() => {
    dVisited = new Set(); dCurrent = null; dDist = {0:0,1:Infinity,2:Infinity,3:Infinity,4:Infinity,5:Infinity};
    drawDijkstra(); updateDLog();
  }, 60);
}

async function runDijkstra() {
  if (window._running) return;
  resetDijkstra(); await sleep(100);
  window._running = true;
  
  let pq = [{id: 0, d: 0}];
  
  while (pq.length > 0 && !window._aborted) {
    pq.sort((a, b) => a.d - b.d);
    let {id, d} = pq.shift();
    
    if (dVisited.has(id)) continue;
    
    dCurrent = id;
    drawDijkstra();
    await sleep(800);
    if (window._aborted) break;
    
    dVisited.add(id);
    dCurrent = null;
    
    for (let [v, weight] of D_ADJ[id]) {
      if (dDist[v] > dDist[id] + weight) {
        dDist[v] = dDist[id] + weight;
        pq.push({id: v, d: dDist[v]});
        drawDijkstra();
        updateDLog();
        await sleep(400);
      }
    }
  }
  window._running = false;
  drawDijkstra();
}