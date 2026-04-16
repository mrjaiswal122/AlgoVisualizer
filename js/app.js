let currentTopic = 'graph';
const sleep = ms => new Promise(r => setTimeout(r, ms));

function setTopic(id) {
  stopAll();
  currentTopic = id;
  const t = TOPICS[id];

  document.querySelectorAll('.topic-btn').forEach(b => {
    b.classList.toggle('active', b.getAttribute('onclick').includes(`'${id}'`));
  });

  document.getElementById('topic-icon').innerHTML     = `<i class="bi ${t.icon}"></i>`;
  document.getElementById('topic-name').textContent   = t.name;
  document.getElementById('topic-cat').textContent    = t.cat;
  document.getElementById('topic-desc').textContent   = t.desc;
  document.getElementById('time-complexity').textContent  = t.time;
  document.getElementById('space-complexity').textContent = t.space;
  document.getElementById('code-filename').textContent    = t.file;

  const codeEl = document.getElementById('code-display');
  codeEl.textContent = t.code;
  hljs.highlightElement(codeEl);

  renderVisualizer(id);
}

function renderVisualizer(id) {
  const c = document.getElementById('visualizer-container');
  switch (id) {
    case 'graph':      c.innerHTML = buildGraphHTML();     setTimeout(() => { drawGraph(); updateLog(); }, 50); break;
    case 'dijkstra':   c.innerHTML = buildDijkstraHTML();  setTimeout(() => { drawDijkstra(); updateDLog(); }, 50); break;
    case 'astar':      c.innerHTML = buildAStarHTML();     setTimeout(() => initAStarGrid(), 50); break;
    case 'sorting':    c.innerHTML = buildSortingHTML();   setTimeout(() => drawBars(), 50);  break;
    case 'linkedlist': c.innerHTML = buildLLHTML();        setTimeout(() => drawLL(), 50);    break;
    case 'stackqueue': c.innerHTML = buildSQHTML();        setTimeout(() => drawSQ(), 50);    break;
    case 'bst':        c.innerHTML = buildBSTHTML();       break;
  }
}

function stopAll() {
  window._aborted  = true;
  window._running  = false;
  setTimeout(() => { window._aborted = false; }, 60);
}

function copyCode() {
  navigator.clipboard.writeText(TOPICS[currentTopic].code).then(() => {
    const icon = document.getElementById('copy-icon');
    icon.className = 'bi bi-clipboard-check text-success';
    setTimeout(() => { icon.className = 'bi bi-clipboard'; }, 2000);
  });
}

window.addEventListener('DOMContentLoaded', () => setTopic('graph'));
