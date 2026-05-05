// ════════════════════════════════════════════
//  WORD DATABASE
// ════════════════════════════════════════════
const WORD_DB = {
  viloyatlar: [
    "TOSHKENT","SAMARQAND","BUXORO","NAMANGAN","ANDIJON",
    "FARGONA","XORAZM","SURXONDARYO","QASHQADARYO","SIRDARYO",
    "JIZZAX","NAVOIY","QORAQALPOGISTON"
  ],
  shaharlar: [
    "URGANCH","NUKUS","TERMIZ","GULISTON","QARSHI",
    "NAVOI","MARGILAN","CHIRCHIQ","ANGREN","BEKOBOD",
    "KOGON","KITOB","SHAHRISABZ","ZARAFSHON","YANGIYER"
  ],
  tumanlar: [
    "YUNUSOBOD","CHILONZOR","MIRZO","YAKKASAROY","ALMAZAR",
    "BEKTEMIR","SERGELI","UCHTEPA","URTACHIRCHIQ","PARKENT",
    "ZANGIOTA","KIBRAY","OHANGARON","BOSTANLIQ","QIBRAY"
  ],
  tarixiy: [
    "REGISTON","BIBIXONUM","SHERDOR","TILLAKORI","AFROSIYOB",
    "GURI","SITORAI","CHORSU","ISMOIL","KALON",
    "ULUGBEK","TAMERLANE","NAVOIY","XORAZM","TERMIZ"
  ],
  madaniyat: [
    "NAVRUZ","SHASHMAQAM","DUTOR","DOIRA","GILAMCHILIK",
    "SUZANI","PAXLAVON","OSHPAZ","TANURA","MAQOM",
    "QOSHTARNOV","LAPAR","ASKIYA","KULOLCHILIK","ZARGARLIK"
  ]
};

const CATEGORIES = Object.keys(WORD_DB);
const CATEGORY_LABELS = {
  viloyatlar:"🗺️ Viloyatlar",
  shaharlar:"🏙️ Shaharlar",
  tumanlar:"📍 Tumanlar",
  tarixiy:"🏛️ Tarixiy Joylar",
  madaniyat:"🎭 Madaniyat"
};

const UZ_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

// ════════════════════════════════════════════
//  STATE
// ════════════════════════════════════════════
let state = {
  level:1, score:0, coins:0, hints:3, highScore:0,
  musicOn:true, sfxOn:true, animOn:true,
  levelStats:[], achievements:[]
};

let game = {
  gridSize:8, words:[], grid:[], foundWords:new Set(),
  selecting:false, selectedCells:[], selectedWord:"",
  timerStart:0, timerSec:0, timerInterval:null,
  combo:0, lastFoundTime:0, categories:[],
  wordPositions:{}
};

// ════════════════════════════════════════════
//  STORAGE
// ════════════════════════════════════════════
function saveState() {
  try { localStorage.setItem('uzbek_ws_state', JSON.stringify(state)); } catch(e){}
}
function loadState() {
  try {
    const s = localStorage.getItem('uzbek_ws_state');
    if(s) Object.assign(state, JSON.parse(s));
  } catch(e){}
}

// ════════════════════════════════════════════
//  AUDIO ENGINE
// ════════════════════════════════════════════
let audioCtx = null;
let musicGain = null;
let musicPlaying = false;
let musicNodes = [];

function initAudio() {
  if(audioCtx) return;
  try {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    musicGain = audioCtx.createGain();
    musicGain.gain.value = 0.18;
    musicGain.connect(audioCtx.destination);
    if(state.musicOn) startMusic();
  } catch(e){}
}

function startMusic() {
  if(!audioCtx || musicPlaying) return;
  musicPlaying = true;
  playMusicLoop();
}

function stopMusic() {
  musicPlaying = false;
  musicNodes.forEach(n => { try{n.stop();}catch(e){} });
  musicNodes = [];
}

// Pentatonic scale: C D E G A in various octaves
const PENTATONIC = [261.63,293.66,329.63,392.00,440.00,523.25,587.33,659.25,783.99,880.00];

function playMusicLoop() {
  if(!audioCtx || !musicPlaying || !state.musicOn) return;
  const melody = [0,2,4,6,4,2,4,7,5,4,2,0,4,2,0,2];
  let t = audioCtx.currentTime;
  melody.forEach((note,i) => {
    const osc = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.value = PENTATONIC[note % PENTATONIC.length];
    g.gain.setValueAtTime(0, t + i*0.28);
    g.gain.linearRampToValueAtTime(0.5, t + i*0.28 + 0.05);
    g.gain.linearRampToValueAtTime(0, t + i*0.28 + 0.24);
    osc.connect(g); g.connect(musicGain);
    osc.start(t + i*0.28); osc.stop(t + i*0.28 + 0.26);
    musicNodes.push(osc);
  });
  // Doira rhythm
  for(let i=0;i<8;i++) {
    const buf = audioCtx.createBuffer(1, audioCtx.sampleRate*0.08, audioCtx.sampleRate);
    const d = buf.getChannelData(0);
    for(let j=0;j<d.length;j++) d[j] = (Math.random()*2-1)*Math.exp(-j/(d.length*0.15));
    const src = audioCtx.createBufferSource();
    const fg = audioCtx.createGain();
    src.buffer = buf; fg.gain.value = 0.12;
    src.connect(fg); fg.connect(musicGain);
    src.start(t + i*0.56);
    musicNodes.push(src);
  }
  const loopDur = melody.length * 0.28;
  setTimeout(() => { if(musicPlaying && state.musicOn) playMusicLoop(); }, loopDur*1000 - 200);
}

function sfx(type) {
  if(!audioCtx || !state.sfxOn) return;
  const g = audioCtx.createGain();
  g.connect(audioCtx.destination);
  if(type === 'found') {
    [392,523,659].forEach((f,i) => {
      const o = audioCtx.createOscillator();
      o.type='sine'; o.frequency.value=f;
      const og = audioCtx.createGain();
      og.gain.setValueAtTime(0, audioCtx.currentTime+i*0.07);
      og.gain.linearRampToValueAtTime(0.4, audioCtx.currentTime+i*0.07+0.04);
      og.gain.linearRampToValueAtTime(0, audioCtx.currentTime+i*0.07+0.2);
      o.connect(og); og.connect(audioCtx.destination);
      o.start(audioCtx.currentTime+i*0.07); o.stop(audioCtx.currentTime+i*0.07+0.22);
    });
  } else if(type === 'error') {
    const o = audioCtx.createOscillator();
    o.type='sawtooth'; o.frequency.value=180;
    g.gain.setValueAtTime(0.3,audioCtx.currentTime);
    g.gain.linearRampToValueAtTime(0,audioCtx.currentTime+0.18);
    o.connect(g); o.start(); o.stop(audioCtx.currentTime+0.2);
  } else if(type === 'complete') {
    [261,329,392,523,659,784].forEach((f,i) => {
      const o = audioCtx.createOscillator();
      o.type='triangle'; o.frequency.value=f;
      const og=audioCtx.createGain();
      og.gain.setValueAtTime(0,audioCtx.currentTime+i*0.09);
      og.gain.linearRampToValueAtTime(0.35,audioCtx.currentTime+i*0.09+0.05);
      og.gain.linearRampToValueAtTime(0,audioCtx.currentTime+i*0.09+0.3);
      o.connect(og); og.connect(audioCtx.destination);
      o.start(audioCtx.currentTime+i*0.09); o.stop(audioCtx.currentTime+i*0.09+0.35);
    });
  } else if(type === 'hint') {
    const o = audioCtx.createOscillator();
    o.type='sine'; o.frequency.value=880;
    o.frequency.linearRampToValueAtTime(440, audioCtx.currentTime+0.2);
    g.gain.setValueAtTime(0.3,audioCtx.currentTime);
    g.gain.linearRampToValueAtTime(0,audioCtx.currentTime+0.25);
    o.connect(g); o.start(); o.stop(audioCtx.currentTime+0.28);
  }
}

// ════════════════════════════════════════════
//  PARTICLES SYSTEM
// ════════════════════════════════════════════
const pCanvas = document.getElementById('particles-canvas');
const pCtx = pCanvas.getContext('2d');
let particles = [];
let particleTheme = 'dawn';

function resizeParticles() {
  pCanvas.width = window.innerWidth;
  pCanvas.height = window.innerHeight;
}

function spawnParticles() {
  particles = [];
  const count = particleTheme === 'night' ? 120 : 40;
  for(let i=0;i<count;i++) {
    particles.push({
      x: Math.random()*pCanvas.width,
      y: Math.random()*pCanvas.height,
      r: Math.random()*3+1,
      vx: (Math.random()-0.5)*0.4,
      vy: Math.random()*-0.6-0.2,
      alpha: Math.random()*0.6+0.2,
      color: particleTheme==='night'?'#FFFFFF': particleTheme==='fergana'?'#90EE90':'#D4AF37'
    });
  }
}

function animParticles() {
  pCtx.clearRect(0,0,pCanvas.width,pCanvas.height);
  particles.forEach(p => {
    pCtx.beginPath();
    pCtx.arc(p.x,p.y,p.r,0,Math.PI*2);
    pCtx.fillStyle = p.color;
    pCtx.globalAlpha = p.alpha;
    pCtx.fill();
    p.x += p.vx; p.y += p.vy;
    if(p.y < -10) { p.y=pCanvas.height+10; p.x=Math.random()*pCanvas.width; }
    if(p.x<-10) p.x=pCanvas.width+10;
    if(p.x>pCanvas.width+10) p.x=-10;
  });
  pCtx.globalAlpha=1;
  requestAnimationFrame(animParticles);
}

// ════════════════════════════════════════════
//  BACKGROUND THEMES
// ════════════════════════════════════════════
function setBackground(level) {
  const bg = document.getElementById('bg-layer');
  let pTheme;
  if(level<=3) { bg.className='dawn'; pTheme='dawn'; }
  else if(level<=6) { bg.className='samarkand'; pTheme='samarkand'; }
  else if(level<=9) { bg.className='fergana'; pTheme='fergana'; updateCamels(true); }
  else { bg.className='night'; pTheme='night'; updateCamels(false); }
  if(pTheme !== particleTheme) {
    particleTheme = pTheme;
    spawnParticles();
  }
}

function updateCamels(show) {
  document.querySelectorAll('.camel').forEach(c => c.remove());
  if(!show || !state.animOn) return;
  for(let i=0;i<3;i++) {
    const c = document.createElement('div');
    c.className='camel';
    c.textContent='🐪';
    const dur = 18+i*7;
    const delay = i*6;
    c.style.cssText = `animation-duration:${dur}s;animation-delay:-${delay}s;bottom:${6+i*4}%;font-size:${40+i*10}px;opacity:${0.12+i*0.04}`;
    document.body.appendChild(c);
  }
}

// ════════════════════════════════════════════
//  WORD SELECTION PER LEVEL
// ════════════════════════════════════════════
function pickWords(level) {
  const shuffledCats = [...CATEGORIES].sort(()=>Math.random()-0.5);
  const usedCats = shuffledCats.slice(0,5);
  const words = usedCats.map(cat => {
    const pool = WORD_DB[cat];
    return pool[Math.floor(Math.random()*pool.length)];
  });
  game.categories = usedCats;
  const maxLen = game.gridSize - 1;
  return words.map(w => w.length>maxLen ? w.slice(0,maxLen) : w);
}

// ════════════════════════════════════════════
//  GRID GENERATION
// ════════════════════════════════════════════
const DIRECTIONS = [
  [0,1],[1,0],[1,1],[1,-1],
  [0,-1],[-1,0],[-1,-1],[-1,1]
];

function createGrid(size) {
  return Array.from({length:size}, ()=>Array(size).fill(''));
}

function canPlace(grid, word, r, c, dr, dc) {
  const n = grid.length;
  for(let i=0;i<word.length;i++) {
    const nr=r+dr*i, nc=c+dc*i;
    if(nr<0||nr>=n||nc<0||nc>=n) return false;
    if(grid[nr][nc]!=='' && grid[nr][nc]!==word[i]) return false;
  }
  return true;
}

function placeWord(grid, word, r, c, dr, dc) {
  const cells = [];
  for(let i=0;i<word.length;i++) {
    grid[r+dr*i][c+dc*i] = word[i];
    cells.push([r+dr*i, c+dc*i]);
  }
  return cells;
}

function generateGrid(size, words) {
  const grid = createGrid(size);
  const positions = {};
  for(const word of words) {
    let placed = false;
    for(let attempt=0;attempt<1000 && !placed;attempt++) {
      const [dr,dc] = DIRECTIONS[Math.floor(Math.random()*DIRECTIONS.length)];
      const r = Math.floor(Math.random()*size);
      const c = Math.floor(Math.random()*size);
      if(canPlace(grid, word, r, c, dr, dc)) {
        positions[word] = placeWord(grid, word, r, c, dr, dc);
        placed = true;
      }
    }
    if(!placed) {
      for(let r=0;r<size&&!placed;r++) {
        for(let c=0;c<=size-word.length&&!placed;c++) {
          if(canPlace(grid,word,r,c,0,1)) {
            positions[word]=placeWord(grid,word,r,c,0,1);
            placed=true;
          }
        }
      }
    }
  }
  for(let r=0;r<size;r++)
    for(let c=0;c<size;c++)
      if(grid[r][c]==='') grid[r][c]=UZ_LETTERS[Math.floor(Math.random()*UZ_LETTERS.length)];
  return {grid, positions};
}

// ════════════════════════════════════════════
//  RENDER GRID
// ════════════════════════════════════════════
function renderGrid() {
  const el = document.getElementById('word-grid');
  const size = game.gridSize;
  el.style.gridTemplateColumns = `repeat(${size}, var(--cell-size))`;
  el.innerHTML='';
  for(let r=0;r<size;r++) {
    for(let c=0;c<size;c++) {
      const cell = document.createElement('div');
      cell.className='grid-cell';
      cell.textContent=game.grid[r][c];
      cell.dataset.r=r; cell.dataset.c=c;
      el.appendChild(cell);
    }
  }
}

function renderWords() {
  const list = document.getElementById('words-list');
  list.innerHTML='';
  game.words.forEach(w => {
    const chip = document.createElement('div');
    chip.className='word-chip' + (game.foundWords.has(w) ? ' found-chip':'');
    chip.textContent=w;
    chip.id='chip-'+w;
    list.appendChild(chip);
  });
  const catNames = game.categories.map(c=>CATEGORY_LABELS[c]||c).join(' · ');
  document.getElementById('category-display').textContent = catNames;
}

// ════════════════════════════════════════════
//  CELL LOOKUP
// ════════════════════════════════════════════
function cellAt(r,c) {
  return document.querySelector(`#word-grid .grid-cell[data-r="${r}"][data-c="${c}"]`);
}
function clearSelecting() {
  document.querySelectorAll('#word-grid .grid-cell.selecting').forEach(c=>c.classList.remove('selecting'));
  game.selectedCells=[];
  game.selectedWord='';
}

// ════════════════════════════════════════════
//  SELECTION LOGIC
// ════════════════════════════════════════════
function getEventCell(e) {
  let el;
  if(e.touches) {
    const t=e.touches[0]||e.changedTouches[0];
    el = document.elementFromPoint(t.clientX, t.clientY);
  } else { el = e.target; }
  if(!el||!el.classList.contains('grid-cell')) return null;
  return el;
}

function onSelectStart(e) {
  e.preventDefault();
  initAudio();
  clearSelecting();
  game.selecting=true;
  const cell=getEventCell(e);
  if(cell) addToSelection(cell);
}

function onSelectMove(e) {
  if(!game.selecting) return;
  e.preventDefault();
  const cell=getEventCell(e);
  if(!cell) return;
  if(game.selectedCells.length===0) { addToSelection(cell); return; }
  const [r0,c0]=[+game.selectedCells[0].dataset.r,+game.selectedCells[0].dataset.c];
  const [r1,c1]=[+cell.dataset.r,+cell.dataset.c];
  const dr=r1-r0, dc=c1-c0;
  const steps=Math.max(Math.abs(dr),Math.abs(dc));
  if(steps===0) return;
  const nr=dr!==0?dr/Math.abs(dr):0;
  const nc=dc!==0?dc/Math.abs(dc):0;
  if(dr!==0&&dc!==0&&Math.abs(dr)!==Math.abs(dc)) return;
  clearSelecting();
  game.selecting=true;
  for(let i=0;i<=steps;i++) {
    const rr=r0+nr*i, cc=c0+nc*i;
    const c2=cellAt(rr,cc);
    if(c2) { c2.classList.add('selecting'); game.selectedCells.push(c2); }
  }
  game.selectedWord=game.selectedCells.map(c=>c.textContent).join('');
}

function onSelectEnd(e) {
  if(!game.selecting) return;
  game.selecting=false;
  checkWord();
}

function addToSelection(cell) {
  if(!cell.classList.contains('found')) {
    cell.classList.add('selecting');
    game.selectedCells.push(cell);
    game.selectedWord=game.selectedCells.map(c=>c.textContent).join('');
  }
}

function checkWord() {
  const w = game.selectedWord;
  const wr = w.split('').reverse().join('');
  const match = game.words.find(word => (word===w||word===wr) && !game.foundWords.has(word));
  if(match) {
    foundWord(match);
  } else {
    game.selectedCells.forEach(c => {
      c.classList.remove('selecting');
      c.classList.add('invalid-flash');
      setTimeout(()=>c.classList.remove('invalid-flash'),350);
    });
    game.selectedCells=[]; game.selectedWord='';
    sfx('error');
    game.combo=0;
    updateComboLabel();
  }
}

function foundWord(word) {
  sfx('found');
  game.foundWords.add(word);
  const pos = game.wordPositions[word];
  if(pos) pos.forEach(([r,c])=>{ const cell=cellAt(r,c); if(cell){ cell.classList.remove('selecting'); cell.classList.add('found'); } });
  else game.selectedCells.forEach(c=>{ c.classList.remove('selecting'); c.classList.add('found'); });
  game.selectedCells=[]; game.selectedWord='';

  const now=Date.now();
  if(now-game.lastFoundTime<4000) game.combo=Math.min(game.combo+1,5);
  else game.combo=1;
  game.lastFoundTime=now;
  const pts = 100 * game.combo;
  state.score += pts;
  state.coins += Math.ceil(pts/20);
  updateStats();
  updateComboLabel();

  const chip=document.getElementById('chip-'+word);
  if(chip) chip.className='word-chip found-chip';

  const msgs=['Zo\'r!','Ajoyib!','A\'lo!','Barakalla!','Super!'];
  showToast(msgs[Math.floor(Math.random()*msgs.length)]+ (game.combo>1?` x${game.combo}`:'')+` +${pts}`);

  if(game.foundWords.size===game.words.length) {
    setTimeout(levelComplete, 700);
  }
}

function updateStats() {
  document.getElementById('score-display').textContent = state.score;
  document.getElementById('coins-display').textContent = state.coins;
  document.getElementById('level-display').textContent = `DARAJA ${state.level}`;
  document.getElementById('hint-count').textContent = state.hints;
  saveState();
}

function updateComboLabel() {
  const el=document.getElementById('combo-label');
  if(game.combo>1) { el.textContent=`🔥 x${game.combo} KOMBO`; el.style.color='var(--gold)'; }
  else el.textContent='';
}

// ════════════════════════════════════════════
//  TIMER
// ════════════════════════════════════════════
function startTimer() {
  game.timerStart=Date.now();
  game.timerSec=0;
  clearInterval(game.timerInterval);
  game.timerInterval=setInterval(()=>{
    game.timerSec=Math.floor((Date.now()-game.timerStart)/1000);
    const m=Math.floor(game.timerSec/60), s=game.timerSec%60;
    document.getElementById('timer-display').textContent=`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  },500);
}
function stopTimer() { clearInterval(game.timerInterval); }

// ════════════════════════════════════════════
//  LEVEL FLOW
// ════════════════════════════════════════════
function startLevel(level) {
  state.level=level;
  if(level<=5) game.gridSize=8;
  else if(level<=10) game.gridSize=10;
  else game.gridSize=13;

  game.foundWords=new Set();
  game.selectedCells=[];
  game.selectedWord='';
  game.selecting=false;
  game.combo=0;
  game.lastFoundTime=0;

  game.words=pickWords(level);
  const {grid, positions}=generateGrid(game.gridSize, game.words);
  game.grid=grid;
  game.wordPositions=positions;

  setBackground(level);
  renderGrid();
  renderWords();
  updateStats();
  startTimer();

  const gridEl=document.getElementById('word-grid');
  gridEl.onmousedown=onSelectStart;
  gridEl.onmousemove=onSelectMove;
  gridEl.onmouseup=onSelectEnd;
  gridEl.ontouchstart=onSelectStart;
  gridEl.ontouchmove=onSelectMove;
  gridEl.ontouchend=onSelectEnd;
  document.onmouseup=()=>{ if(game.selecting){ game.selecting=false; checkWord(); } };

  showScreen('game-screen');
}

function levelComplete() {
  stopTimer();
  sfx('complete');

  const timeSec=game.timerSec;
  const speedBonus=Math.max(0, 200-timeSec*2);
  const wordBonus=game.words.length*100;
  const comboBonus=Math.floor(state.score*0.05);
  state.score+=speedBonus+comboBonus;
  if(state.score>state.highScore) state.highScore=state.score;

  let stars=1;
  if(timeSec<60) stars=3;
  else if(timeSec<120) stars=2;

  document.getElementById('modal-sub-text').textContent=`Daraja ${state.level} — ${timeSec}s`;
  const br=document.getElementById('score-breakdown');
  br.innerHTML=`
    <div class="score-row"><span>So'zlar uchun</span><span>${wordBonus}</span></div>
    <div class="score-row"><span>Tezlik bonus</span><span>+${speedBonus}</span></div>
    <div class="score-row"><span>Kombo bonus</span><span>+${comboBonus}</span></div>
    <div class="score-row"><span>Jami</span><span>${state.score}</span></div>
  `;

  const starEls=document.querySelectorAll('#stars-row .star');
  starEls.forEach((s,i)=>{ s.classList.remove('lit'); });
  for(let i=0;i<stars;i++) {
    setTimeout(()=>starEls[i]?.classList.add('lit'), 200+i*300);
  }

  const achs=[];
  if(stars===3) achs.push({icon:'⚡',text:'Tez!'});
  if(game.combo>=3) achs.push({icon:'🔥',text:'Kombo ustasi'});
  if(timeSec<30) achs.push({icon:'🏆',text:'Rekord!'});
  if(state.level===1) achs.push({icon:'🎮',text:'Boshliqchi'});
  const ar=document.getElementById('achievements-row');
  ar.innerHTML=achs.map(a=>`<div class="ach-badge">${a.icon} ${a.text}</div>`).join('');

  saveState();
  document.getElementById('level-modal').classList.remove('hidden');
}

// ════════════════════════════════════════════
//  HINT
// ════════════════════════════════════════════
function useHint() {
  if(state.hints<=0) { showToast('Ko\'mak yo\'q!'); return; }
  const remaining=game.words.filter(w=>!game.foundWords.has(w));
  if(!remaining.length) return;
  sfx('hint');
  state.hints--;
  updateStats();
  const word=remaining[0];
  const pos=game.wordPositions[word];
  if(!pos) return;
  pos.slice(0,3).forEach(([r,c],i)=>{
    setTimeout(()=>{
      const cell=cellAt(r,c);
      if(cell){ cell.style.background='rgba(212,175,55,0.5)'; setTimeout(()=>cell.style.background='',600); }
    }, i*150);
  });
  showToast(`💡 ${word.slice(0,3)}...`);
}

// ════════════════════════════════════════════
//  TOAST
// ════════════════════════════════════════════
let toastTimeout=null;
function showToast(msg) {
  const t=document.getElementById('toast');
  t.textContent=msg; t.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout=setTimeout(()=>t.classList.remove('show'),1500);
}

// ════════════════════════════════════════════
//  SCREEN MANAGEMENT
// ════════════════════════════════════════════
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s=>s.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

// ════════════════════════════════════════════
//  SETTINGS TOGGLES
// ════════════════════════════════════════════
function initToggle(id, key, onChange) {
  const el=document.getElementById(id);
  el.classList.toggle('on', state[key]);
  el.onclick=()=>{
    state[key]=!state[key];
    el.classList.toggle('on',state[key]);
    saveState();
    if(onChange) onChange(state[key]);
  };
}

// ════════════════════════════════════════════
//  INIT
// ════════════════════════════════════════════
function init() {
  loadState();
  resizeParticles();
  spawnParticles();
  animParticles();
  setBackground(state.level||1);
  document.getElementById('hs-display').textContent = state.highScore||0;
  updateStats();

  document.getElementById('btn-start').onclick=()=>{
    initAudio();
    startLevel(state.level||1);
  };

  document.getElementById('btn-settings-start').onclick=()=>{
    document.getElementById('settings-panel').classList.remove('hidden');
  };

  document.getElementById('btn-next-level').onclick=()=>{
    document.getElementById('level-modal').classList.add('hidden');
    state.level++;
    startLevel(state.level);
  };

  document.getElementById('btn-hint').onclick=useHint;

  document.getElementById('btn-menu').onclick=()=>{
    document.getElementById('settings-panel').classList.remove('hidden');
  };

  initToggle('toggle-music','musicOn', on=>{
    if(on) { if(!musicPlaying) startMusic(); }
    else stopMusic();
  });
  initToggle('toggle-sfx','sfxOn');
  initToggle('toggle-anim','animOn', on=>{
    if(!on) document.querySelectorAll('.camel').forEach(c=>c.remove());
    else if(state.level>=7&&state.level<=9) updateCamels(true);
  });

  document.getElementById('btn-close-settings').onclick=()=>{
    document.getElementById('settings-panel').classList.add('hidden');
  };

  document.getElementById('btn-reset').onclick=()=>{
    if(confirm('Hamma narsani o\'chirish?')) {
      state={level:1,score:0,coins:0,hints:3,highScore:0,musicOn:true,sfxOn:true,animOn:true,levelStats:[],achievements:[]};
      saveState();
      document.getElementById('settings-panel').classList.add('hidden');
      showScreen('start-screen');
      document.getElementById('hs-display').textContent='0';
      stopTimer();
    }
  };

  document.getElementById('level-modal').addEventListener('click', e=>{
    if(e.target===document.getElementById('level-modal')) {
      document.getElementById('level-modal').classList.add('hidden');
    }
  });

  window.addEventListener('resize', resizeParticles);
  showScreen('start-screen');
}

init();
