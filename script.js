/* ══════════════════════════════════════════════
   SAVOL BANKI — O'ZBEK TILIDA
══════════════════════════════════════════════ */
const BANKS = {
  math: [
    {q:"sin(x) ning hosilasi nima?",o:["cos(x)","-cos(x)","sin(x)","-sin(x)"],a:0},
    {q:"2x + 5 = 13 dan x ni toping.",o:["3","4","5","6"],a:1},
    {q:"log₂(64) = ?",o:["4","5","6","7"],a:2},
    {q:"∫x² dx ning natijasi nima?",o:["x³","x³/3 + C","2x","3x²"],a:1},
    {q:"f(x) = x² - 4 funksiyasining nollari qaysilar?",o:["faqat x=2","faqat x=-2","x=±2","x=0 va 4"],a:2},
    {q:"Uchburchakning ikki burchagi 45° va 45°. Uchinchisi?",o:["60°","80°","90°","100°"],a:2},
    {q:"240 ning 15% qancha?",o:["34","36","38","40"],a:1},
    {q:"Birinchi n ta natural son yig'indisi formulasi?",o:["n(n+1)","n(n+1)/2","n²","(n+1)/2"],a:1},
    {q:"lim(x→0) sin(x)/x = ?",o:["0","∞","1","aniqlanmaydi"],a:2},
    {q:"Radiusi 7 bo'lgan doiraning yuzi?",o:["49π","14π","7π","154π"],a:0}
  ],
  physics: [
    {q:"Kuch o'lchov birligi (SI)?",o:["Joule","Vatt","Nyuton","Paskal"],a:2},
    {q:"Nyutonning ikkinchi qonuni?",o:["F=mv","F=ma","a=mv","E=mc²"],a:1},
    {q:"Yorug'lik taxminan qanday tezlikda tarqaladi?",o:["3×10⁶ m/s","3×10⁸ m/s","3×10¹⁰ m/s","3×10⁴ m/s"],a:1},
    {q:"E=mc² formulasi nimani ifodalaydi?",o:["Kinetik energiya","Massa-energiya ekvivalentligi","Potentsial energiya","Elektr energiyasi"],a:1},
    {q:"Elektr qarshilik o'lchov birligi?",o:["Volt","Amper","Om","Farad"],a:2}
  ],
  english: [
    {q:"'Ephemeral' so'zining sinoniomi?",o:["Abadiy","O'tkinchi","Mustahkam","Yorqin"],a:1},
    {q:"To'g'ri gapni tanlang:",o:["She don't know","She doesn't know","She didn't knew","She not know"],a:1},
    {q:"'Criterion' so'zining ko'pligi?",o:["Criterions","Criteri","Criteria","Criterias"],a:2},
    {q:"'Loquacious' nimani anglatadi?",o:["Jim","Serzuv","Tajovuzkor","Dangasa"],a:1}
  ],
  programming: [
    {q:"HTML ning to'liq nomi?",o:["Hyper Text Markup Language","High Text Markup Language","Hyper Transfer Markup Language","High Transfer Machine Language"],a:0},
    {q:"Ikkilik qidiruvning vaqt murakkabligi?",o:["O(n)","O(n²)","O(log n)","O(1)"],a:2},
    {q:"LIFO tamoyilida ishlovchi ma'lumot tuzilmasi?",o:["Navbat","Stek","Massiv","Bog'liq ro'yxat"],a:1},
    {q:"OOP nimaning qisqartmasi?",o:["Ob'ektga yo'naltirilgan dasturlash","Ochiq operatsion protsedura","Tartibli ob'ekt qayta ishlash","Hech biri"],a:0}
  ],
  history: [
    {q:"Ikkinchi Jahon urushi qaysi yilda tugadi?",o:["1943","1944","1945","1946"],a:2},
    {q:"AQSHning birinchi prezidenti kim?",o:["John Adams","Tomas Jefferson","Jorj Vashington","Benjamin Franklin"],a:2},
    {q:"Renessans qaysi mamlakatda boshlandi?",o:["Fransiya","Ispaniya","Germaniya","Italiya"],a:3},
    {q:"Berlin devori qaysi yilda qulab tushdi?",o:["1987","1988","1989","1990"],a:2}
  ]
};

const IQ_QS = [
  {cat:"Naqshni aniqlash",q:"Ketma-ketlikni davom ettiring: 2, 4, 8, 16, ___?",o:["24","30","32","36"],a:2},
  {cat:"Mantiqiy fikrlash",q:"Barcha atirlar guldir. Ba'zi gullar tez so'liydi. Demak:",o:["Barcha atirlar so'liydi","Ba'zi atirlar so'lishi mumkin","Hech bir atir so'lmaydi","Atirlar hech qachon so'lmaydi"],a:1},
  {cat:"Analogiya",q:"Shifokor : Kasalxona :: O'qituvchi : ___",o:["O'quvchi","Sinf","Maktab","Bilim"],a:2},
  {cat:"Raqamli fikrlash",q:"6 ishchi devorni 10 kunda qursa, 10 ishchi necha kunda quradi?",o:["4","6","8","12"],a:1},
  {cat:"Abstrak tafakkur",q:"Qaysi so'z boshqalardan farq qiladi: Eman, Qarag'ay, Atirgul, Chinor?",o:["Eman","Qarag'ay","Atirgul","Chinor"],a:2}
];

/* ══════════════════════════════════════════════
   KONSTANTALAR VA HOLAT
══════════════════════════════════════════════ */
const SUBS = ['math','physics','english','programming','history'];
const SLBL = {math:'Matematika',physics:'Fizika',english:'Ingliz tili',programming:'Dasturlash',history:'Tarix'};
const SCLR = {math:'#f59e0b',physics:'#06b6d4',english:'#8b5cf6',programming:'#10b981',history:'#ef4444'};
const EXAM_DUR = 7200; 
const IQ_DUR = 300;

let A = {
  theme:'dark',
  iqScore:0, iqAnswers:[], difficulty:"O'rta",
  iqIdx:0, iqTimer:null, iqSec:IQ_DUR,
  examMode:null, examQs:{}, examAns:{},
  curSub:'math', curIdx:0,
  examTimer:null, examSec:EXAM_DUR, examStart:null
};

const $=id=>document.getElementById(id);

/* ══ YORDAMCHI FUNKSIYALAR ══ */
function scr(id){document.querySelectorAll('.scr').forEach(s=>s.classList.remove('on'));$(id).classList.add('on')}
function shuffle(arr){return [...arr].sort(()=>Math.random()-0.5)}
function fmtTime(s){
  const h=Math.floor(s/3600), m=Math.floor((s%3600)/60), sec=s%60;
  return h>0 ? `${h}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}` : `${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
}
function toast(msg,type='info'){
  const c=$('toasts'); const t=document.createElement('div');
  t.className=`toast ${type}`; t.textContent=msg;
  c.appendChild(t); setTimeout(()=>t.remove(),3400);
}
function modal(title,body,cb){
  $('mTitle').textContent=title; $('mBody').textContent=body;
  $('modal').style.display='flex'; $('mOk').onclick=()=>{ $('modal').style.display='none'; cb(); }
}
$('mCancel').onclick=()=>$('modal').style.display='none';

/* ══ TEMA VA YUKLANISH ══ */
window.addEventListener('load',()=>{
  const d=localStorage.getItem('it_data');
  if(d){ const p=JSON.parse(d); A.iqScore=p.iqScore; A.difficulty=p.difficulty; }
  setTimeout(()=>{$('loader').classList.add('gone'); scr('s-home')},1500);
});

$('themeBtn').onclick=()=>{
  A.theme=A.theme==='dark'?'light':'dark';
  document.documentElement.setAttribute('data-theme',A.theme);
  $('themeBtn').textContent=A.theme==='dark'?'☀':'☾';
};

/* ══════════════════════════════
   IQ TESTI MANTIQI
══════════════════════════════ */
$('btnStartIQ').onclick=()=>{ scr('s-iq'); resetIQ(); };
$('btnIQGo').onclick=startIQ;

function resetIQ(){
  A.iqIdx=0; A.iqAnswers=[]; A.iqSec=IQ_DUR;
  $('iqIntro').style.display='block'; $('iqQwrap').style.display='none';
}

function startIQ(){
  $('iqIntro').style.display='none'; $('iqQwrap').style.display='block';
  A.iqTimer=setInterval(()=>{
    A.iqSec--; $('iqTimer').textContent=fmtTime(A.iqSec);
    if(A.iqSec<=0) finishIQ();
  },1000);
  renderIQQ();
}

function renderIQQ(){
  const q=IQ_QS[A.iqIdx]; $('iqCat').textContent=q.cat;
  $('iqQNum').textContent=`${A.iqIdx+1} / ${IQ_QS.length}`;
  $('iqQText').textContent=q.q;
  const o=$('iqOpts'); o.innerHTML='';
  q.o.forEach((txt,i)=>{
    const b=document.createElement('button'); b.className='opt';
    b.innerHTML=`<span class="opt-l">${String.fromCharCode(65+i)}</span><span>${txt}</span>`;
    b.onclick=()=>handleIQAns(i); o.appendChild(b);
  });
  $('iqFill').style.width=(A.iqIdx/IQ_QS.length*100)+'%';
}

function handleIQAns(sel){
  A.iqAnswers.push(sel===IQ_QS[A.iqIdx].a);
  A.iqIdx++; A.iqIdx>=IQ_QS.length ? finishIQ() : renderIQQ();
}

function finishIQ(){
  clearInterval(A.iqTimer);
  A.iqScore=A.iqAnswers.filter(x=>x).length;
  A.difficulty=A.iqScore>=4?"Qiyin":A.iqScore>=2?"O'rta":"Oson";
  localStorage.setItem('it_data', JSON.stringify({iqScore:A.iqScore, difficulty:A.difficulty}));
  updateDash(); scr('s-dash');
}

/* ══════════════════════════════
   DASHBOARD VA IMTIHON
══════════════════════════════ */
function updateDash(){
  $('userLevel').textContent=A.difficulty;
  $('dashName').textContent="Jigarim";
  $('iqScoreShow').textContent=A.iqScore;
}

$('btnFullExam').onclick=()=>modal("Imtihon","Tayyormisiz?",()=>startExam('full'));

function startExam(mode){
  A.examMode=mode; A.examAns={}; A.examQs={}; A.examStart=Date.now();
  const subs=mode==='full'?SUBS:[mode];
  subs.forEach(s=>{ A.examQs[s]=shuffle(BANKS[s]); A.examAns[s]={}; });
  A.curSub=subs[0]; A.curIdx=0;
  scr('s-exam'); renderQ(); startExamTimer();
}

function renderQ(){
  const qs=A.examQs[A.curSub], q=qs[A.curIdx];
  $('qtext').textContent=q.q;
  const opts=$('qopts'); opts.innerHTML='';
  q.o.forEach((txt,i)=>{
    const b=document.createElement('button'); b.className='opt';
    b.innerHTML=`<span>${txt}</span>`;
    b.onclick=()=> { A.examAns[A.curSub][A.curIdx]=i; toast("Saqlandi",'ok'); };
    opts.appendChild(b);
  });
}

function startExamTimer(){
  A.examTimer=setInterval(()=>{
    A.examSec--; $('timerTxt').textContent=fmtTime(A.examSec);
    if(A.examSec<=0) submitExam();
  },1000);
}

$('btnSubmit').onclick=()=>modal("Yakunlash","Imtihonni topshirasizmi?",submitExam);

function submitExam(){
  clearInterval(A.examTimer);
  let score=0, total=0;
  Object.keys(A.examQs).forEach(s=>{
    A.examQs[s].forEach((q,i)=>{
      total++; if(A.examAns[s][i]===q.a) score++;
    });
  });
  const pct=Math.round(score/total*100);
  $('ovScore').textContent=pct; scr('s-res');
}

$('btnHome').onclick=()=>scr('s-home');
