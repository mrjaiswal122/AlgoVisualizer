let astarGrid = [], astarCols = 20, astarRows = 12;
let startNode = [2, 2], endNode = [17, 9];

function buildAStarHTML() {
    return `
    <div class="viz-controls">
        <button class="btn btn-primary-viz" onclick="runAStar()"><i class="bi bi-magic"></i> Visualize A*</button>
        <button class="btn btn-secondary-viz" onclick="initAStarGrid()"> Random Walls</button>
        <button class="btn btn-reset" onclick="initAStarGrid(false)"><i class="bi bi-arrow-counterclockwise"></i> Reset</button>
    </div>
    <div class="viz-body d-flex align-items-center justify-content-center">
        <div id="astar-container" class="astar-grid"></div>
    </div>`;
}

function initAStarGrid(randomWalls = true) {
    stopAll();
    const container = document.getElementById('astar-container');
    if (!container) return;
    container.innerHTML = '';
    astarGrid = [];
    for (let r = 0; r < astarRows; r++) {
        for (let c = 0; c < astarCols; c++) {
            const isWall = randomWalls && Math.random() < 0.25 && !(r == startNode[1] && c == startNode[0]) && !(r == endNode[1] && c == endNode[0]);
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            if (r == startNode[1] && c == startNode[0]) cell.classList.add('cell-start');
            else if (r == endNode[1] && c == endNode[0]) cell.classList.add('cell-end');
            else if (isWall) cell.classList.add('cell-wall');
            cell.id = `cell-${c}-${r}`;
            container.appendChild(cell);
        }
    }
}

async function runAStar() {
    if (window._running) return;
    window._running = true;
    
    const heuristic = (x, y) => Math.abs(x - endNode[0]) + Math.abs(y - endNode[1]);
    let openSet = [{ x: startNode[0], y: startNode[1], g: 0, h: heuristic(...startNode), parent: null }];
    let closedSet = new Set();

    while (openSet.length > 0 && !window._aborted) {
        openSet.sort((a, b) => (a.g + a.h) - (b.g + b.h));
        let current = openSet.shift();
        let key = `${current.x},${current.y}`;

        if (current.x === endNode[0] && current.y === endNode[1]) {
            await showPath(current);
            window._running = false;
            return;
        }

        closedSet.add(key);
        if (key !== `${startNode[0]},${startNode[1]}`) {
            document.getElementById(`cell-${current.x}-${current.y}`).classList.add('cell-visited');
        }

        const neighbors = [[0,1],[1,0],[0,-1],[-1,0]];
        for (let [dx, dy] of neighbors) {
            let nx = current.x + dx, ny = current.y + dy;
            if (nx >= 0 && nx < astarCols && ny >= 0 && ny < astarRows) {
                let nKey = `${nx},${ny}`;
                let el = document.getElementById(`cell-${nx}-${ny}`);
                if (closedSet.has(nKey) || el.classList.contains('cell-wall')) continue;

                let gScore = current.g + 1; 
                let existing = openSet.find(o => o.x === nx && o.y === ny);

                if (!existing || gScore < existing.g) {
                    if (!existing) openSet.push({ x: nx, y: ny, g: gScore, h: heuristic(nx, ny), parent: current });
                    else { existing.g = gScore; existing.parent = current; }
                }
            }
        }
        await sleep(30);
    }
    window._running = false;
}

async function showPath(node) {
    let curr = node;
    while (curr && !window._aborted) {
        let el = document.getElementById(`cell-${curr.x}-${curr.y}`);
        if (!el.classList.contains('cell-start') && !el.classList.contains('cell-end')) {
            el.classList.add('cell-path');
        }
        curr = curr.parent;
        await sleep(40);
    }
}