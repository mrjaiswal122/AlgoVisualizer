function buildBSTHTML() {
  const nodes = [
    {v:50,x:200,y:40}, {v:30,x:100,y:120}, {v:70,x:300,y:120},
    {v:20,x:50, y:200}, {v:40,x:150,y:200}, {v:60,x:250,y:200}, {v:80,x:350,y:200}
  ];
  const edges = [
    [200,40,100,120],[200,40,300,120],
    [100,120,50,200],[100,120,150,200],
    [300,120,250,200],[300,120,350,200]
  ];

  const edgeHTML = edges.map(([x1,y1,x2,y2]) =>
    `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#1e2d45" stroke-width="2"/>`
  ).join('');

  const nodeHTML = nodes.map((n, i) => `
    <g style="animation:popIn .3s ${i * 0.08}s both">
      <circle cx="${n.x}" cy="${n.y}" r="20" fill="#111827" stroke="#7c3aed" stroke-width="2"/>
      <text x="${n.x}" y="${n.y}" text-anchor="middle" dominant-baseline="central"
        fill="white" style="font-family:'Fira Code',monospace;font-size:.85rem;font-weight:700">${n.v}</text>
    </g>`
  ).join('');

  return `
  <div class="viz-controls">
    <span style="font-size:.78rem;font-family:'Fira Code',monospace;color:#6b7280">
      Inorder traversal: 20 30 40 50 60 70 80
    </span>
  </div>
  <div id="bst-body">
    <svg width="400" height="240" style="overflow:visible">${edgeHTML}${nodeHTML}</svg>
  </div>`;
}
