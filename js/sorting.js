const SORT_INIT = [64, 34, 25, 12, 22, 11, 90];
let sortArr = [...SORT_INIT], comparing = [], sortedIdx = [], merging = [];

function buildSortingHTML() {
  sortArr = [...SORT_INIT]; comparing = []; sortedIdx = []; merging = [];
  return `
  <div class="viz-controls">
    <button class="btn btn-primary-viz" onclick="runBubbleSort()"><i class="bi bi-play-fill"></i> Bubble Sort</button>
    <button class="btn btn-secondary-viz" onclick="runMergeSort()"><i class="bi bi-magic"></i> Merge Sort</button>
    <button class="btn btn-reset" onclick="resetSort()"><i class="bi bi-arrow-counterclockwise"></i> Reset</button>
  </div>
  <div id="sorting-bars"></div>`;
}

function drawBars() {
  const el = document.getElementById('sorting-bars');
  if (!el) return;
  const max = Math.max(...SORT_INIT);
  el.innerHTML = sortArr.map((val, i) => {
    const h   = Math.round((val / max) * 160) + 30;
    const cls = comparing.includes(i) ? 'comparing' : 
                merging.includes(i) ? 'merging' :
                sortedIdx.includes(i) ? 'sorted' : '';
    return `<div class="sort-bar ${cls}" style="height:${h}px">${val}</div>`;
  }).join('');
}

function resetSort() {
  stopAll();
  setTimeout(() => { sortArr = [...SORT_INIT]; comparing = []; sortedIdx = []; merging = []; drawBars(); }, 60);
}

async function runBubbleSort() {
  if (window._running) return;
  resetSort(); await sleep(80);
  window._running = true;
  const arr = [...SORT_INIT], n = arr.length, done = [];
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (window._aborted) return;
      comparing = [j, j+1]; sortArr = [...arr]; drawBars(); await sleep(420);
      if (arr[j] > arr[j+1]) {
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
        sortArr = [...arr]; drawBars(); await sleep(420);
      }
    }
    done.push(n - 1 - i); sortedIdx = [...done]; drawBars();
  }
  done.push(0); sortedIdx = [...done]; comparing = []; drawBars();
  window._running = false;
}

async function runMergeSort() {
  if (window._running) return;
  resetSort(); await sleep(80);
  window._running = true;
  
  const arr = [...sortArr];
  await mergeSortHelper(arr, 0, arr.length - 1);
  
  if (!window._aborted) {
    sortedIdx = arr.map((_, i) => i);
    comparing = [];
    merging = [];
    drawBars();
  }
  window._running = false;
}

async function mergeSortHelper(arr, l, r) {
  if (l >= r || window._aborted) return;
  const m = Math.floor((l + r) / 2);
  
  comparing = [l, r]; drawBars(); await sleep(300);
  
  await mergeSortHelper(arr, l, m);
  await mergeSortHelper(arr, m + 1, r);
  await merge(arr, l, m, r);
}

async function merge(arr, l, m, r) {
  if (window._aborted) return;
  let left = arr.slice(l, m + 1);
  let right = arr.slice(m + 1, r + 1);
  let i = 0, j = 0, k = l;

  merging = Array.from({length: r - l + 1}, (_, i) => i + l);
  
  while (i < left.length && j < right.length) {
    if (window._aborted) return;
    if (left[i] <= right[j]) { arr[k] = left[i]; i++; }
    else { arr[k] = right[j]; j++; }
    sortArr = [...arr]; drawBars(); await sleep(250);
    k++;
  }
  while (i < left.length) { arr[k] = left[i]; i++; k++; sortArr = [...arr]; drawBars(); await sleep(150); }
  while (j < right.length) { arr[k] = right[j]; j++; k++; sortArr = [...arr]; drawBars(); await sleep(150); }
  
  merging = [];
}
