let llNodes = [10, 20, 30];

function buildLLHTML() {
  llNodes = [10, 20, 30];
  return `
  <div class="viz-controls">
    <button class="btn btn-primary-viz" onclick="llAppend()"><i class="bi bi-plus-lg"></i> Append Node</button>
    <button class="btn" style="background:rgba(239,68,68,.2);color:#fca5a5;border:none;border-radius:8px;font-size:.8rem;padding:5px 14px" onclick="llRemove()">
      <i class="bi bi-trash3-fill"></i> Remove Last
    </button>
  </div>
  <div id="ll-body"></div>`;
}

function drawLL() {
  const el = document.getElementById('ll-body');
  if (!el) return;
  let html = llNodes.map(val => `
    <div class="ll-node">
      <div class="ll-data">${val}</div>
      <div class="ll-ptr"><div class="ll-ptr-dot"></div></div>
    </div>
    <div class="ll-arrow"></div>
  `).join('');
  html += `<div class="ll-null">NULL</div>`;
  el.innerHTML = html;
}

function llAppend() {
  if (llNodes.length >= 7) return;
  llNodes.push(Math.floor(Math.random() * 90) + 10);
  drawLL();
}

function llRemove() {
  if (llNodes.length === 0) return;
  llNodes.pop(); drawLL();
}
