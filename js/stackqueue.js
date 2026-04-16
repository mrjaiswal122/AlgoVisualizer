let sqItems = [10, 20, 30], sqMode = 'stack';

function buildSQHTML() {
  sqItems = [10, 20, 30]; sqMode = 'stack';
  return `
  <div class="viz-controls">
    <div class="mode-toggle">
      <button class="mode-btn active" id="btn-stack" onclick="setSQMode('stack')">Stack (LIFO)</button>
      <button class="mode-btn"        id="btn-queue" onclick="setSQMode('queue')">Queue (FIFO)</button>
    </div>
    <button class="btn btn-primary-viz" onclick="sqPush()">
      <i class="bi bi-arrow-down-circle-fill"></i> <span id="push-label">Push</span>
    </button>
    <button class="btn" style="background:rgba(239,68,68,.2);color:#fca5a5;border:none;border-radius:8px;font-size:.8rem;padding:5px 14px" onclick="sqPop()">
      <i class="bi bi-arrow-up-circle-fill"></i> <span id="pop-label">Pop</span>
    </button>
  </div>
  <div id="sq-body"></div>`;
}

function setSQMode(mode) {
  sqMode = mode; sqItems = [10, 20, 30];
  document.getElementById('btn-stack').classList.toggle('active', mode === 'stack');
  document.getElementById('btn-queue').classList.toggle('active', mode === 'queue');
  document.getElementById('push-label').textContent = mode === 'stack' ? 'Push'  : 'Enqueue';
  document.getElementById('pop-label').textContent  = mode === 'stack' ? 'Pop'   : 'Dequeue';
  drawSQ();
}

function drawSQ() {
  const el = document.getElementById('sq-body');
  if (!el) return;
  const items = sqItems.map(v =>
    `<div class="sq-item ${sqMode === 'queue' ? 'sq-item-q' : ''}">${v}</div>`
  ).join('');
  const empty = sqItems.length === 0
    ? `<div class="${sqMode === 'stack' ? 'sq-empty' : ''}" style="color:#6b7280;font-family:'Fira Code',monospace">Empty</div>`
    : '';
  if (sqMode === 'stack') {
    el.innerHTML = `<div class="sq-container-stack">${empty}${items}</div>`;
  } else {
    el.innerHTML = `<div class="sq-container-queue">${empty}${items}</div>`;
  }
}

function sqPush() {
  if (sqItems.length >= 7) return;
  sqItems.push(Math.floor(Math.random() * 90) + 10);
  drawSQ();
}

function sqPop() {
  if (sqItems.length === 0) return;
  sqMode === 'stack' ? sqItems.pop() : sqItems.shift();
  drawSQ();
}
