/* 동현둠: 동현랭으로 스테이지·난이도·체력·방어구·IDDQD·IDKFA를 정하고, 둠 Shareware 엔진을 띄운다. */
(function(){
const $=s=>document.querySelector(s);

/* ---------- 화면 전환과 탭 ---------- */
$('#theme').onclick=()=>{const dark=document.documentElement.dataset.theme!=='dark';document.documentElement.dataset.theme=dark?'dark':'light';$('#theme').setAttribute('aria-pressed',String(dark));};
function showTab(name){
  document.querySelectorAll('.tabs button').forEach(b=>{const on=b.dataset.tab===name;b.classList.toggle('active',on);on?b.setAttribute('aria-current','page'):b.removeAttribute('aria-current');});
  document.querySelectorAll('.tab-panel').forEach(p=>p.hidden=p.id!=='tab-'+name);
}
document.querySelectorAll('.tabs button').forEach(b=>b.onclick=()=>showTab(b.dataset.tab));
$('.brand').onclick=e=>{e.preventDefault();showTab('play');scrollTo({top:0,behavior:'smooth'});};

/* ---------- 동현랭 편집기(동현랭 시리즈와 같은 모양) ---------- */
for(const ex of examples){const o=document.createElement('option');o.value=ex.id;o.textContent=ex.title;$('#example').append(o);}
const DH_TOKEN=/(ㅋㅋ.*$)|(나는 동현이냐\?|동현이구나)|(오겡끼데스까)|(신중동역|신중동|뭉치)|(뿡뿡뿡|뿡뿡|포동이)|(꽥꽥)|(동+현아)|(동+현)|(도오*옹)|(ㅠ+)|(뚱띠|또치)/g;
const DH_CLS=[null,'t-cmt','t-frame','t-halt','t-ctl','t-out','t-in','t-assign','t-var','t-num','t-minus','t-op'];
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
function dhLine(line){let html='',last=0;line.replace(DH_TOKEN,(m,...gr)=>{const idx=gr[gr.length-2];html+=esc(line.slice(last,idx));const k=gr.slice(0,11).findIndex(x=>x!==undefined)+1;html+=`<span class="${DH_CLS[k]}">${esc(m)}</span>`;last=idx+m.length;return m;});return html+esc(line.slice(last));}
const code=$('#code'), area=document.createElement('div'), hl=document.createElement('div');
area.className='code-area'; hl.id='hl'; hl.setAttribute('aria-hidden','true'); code.parentNode.insertBefore(area,code); area.append(hl,code);
function hlSync(){hl.scrollTop=code.scrollTop;hl.scrollLeft=code.scrollLeft;}
function hlMetrics(){const cs=getComputedStyle(code);for(const p of ['paddingTop','paddingRight','paddingBottom','paddingLeft','fontFamily','fontSize','lineHeight','tabSize','letterSpacing'])hl.style[p]=cs[p];}
function highlight(){hlMetrics();hl.innerHTML=code.value.split('\n').map(l=>`<span class="ln">${dhLine(l)||' '}</span>`).join('')+'<span class="ln"> </span>';hlSync();}
code.addEventListener('scroll',()=>{hlSync();$('#lines').scrollTop=code.scrollTop;});addEventListener('resize',highlight);
function codeChanged(e){if(!e?.isComposing)indent();const n=code.value.split('\n').length;$('#line-count').textContent=n+'줄';$('#lines').textContent=Array.from({length:n},(_,i)=>i+1).join('\n');highlight();}
// 동현랭 시리즈 들여쓰기: ㅋㅋ 주석 세 칸, 명령 두 칸, '나는 동현이냐?'·'동현이구나'는 들여 쓰지 않는다
function indent(){
  const text=code.value,lines=text.split('\n'),lead=l=>l.length-l.replace(/^[ \t]+/,'').length;
  const next=lines.map(l=>{const b=l.slice(lead(l));if(!b)return '';if(b.startsWith('ㅋㅋ'))return '   '+b;const s=b.split('~')[0].replace(/ㅋㅋ.*$/,'').trim();return (s==='나는 동현이냐?'||s==='동현이구나'?'':'  ')+b;});
  const {selectionStart:a,selectionEnd:b,selectionDirection:dir,scrollTop:y,scrollLeft:x}=code;
  const moved=p=>{let o=0,n=0;for(let i=0;i<lines.length;i++){const L=lines[i].length;if(p<=o+L){const c=p-o,ol=lead(lines[i]),nl=lead(next[i]);return n+Math.min(next[i].length,c<ol?nl:c-ol+nl);}o+=L+1;n+=next[i].length+1;}return n;};
  const value=next.join('\n'),na=moved(a),nb=moved(b);if(value===text&&na===a&&nb===b)return;if(value!==text)code.value=value;code.setSelectionRange(na,nb,dir);code.scrollTop=y;code.scrollLeft=x;
}
code.addEventListener('compositionend',()=>codeChanged());
// 커서가 들여쓰기 안에 놓이면 들여쓰기 뒤로 옮기고, 들여쓰기 바로 뒤에서 Backspace를 누르면 윗줄과 합친다
function codeLead(){const a=code.selectionStart,v=code.value,ls=v.lastIndexOf('\n',a-1)+1,le=v.indexOf('\n',ls);return {a,ls,lead:/^[ \t]*/.exec(v.slice(ls,le<0?v.length:le))[0].length};}
document.addEventListener('selectionchange',()=>{if(document.activeElement!==code||code.selectionStart!==code.selectionEnd)return;const {a,ls,lead}=codeLead();if(a-ls<lead)code.setSelectionRange(ls+lead,ls+lead);});
code.addEventListener('beforeinput',e=>{
  const {a,ls,lead}=codeLead();
  if(a!==code.selectionEnd)return;
  if(e.inputType==='deleteContentBackward'&&ls>0&&a>ls&&a-ls<=lead){e.preventDefault();code.setRangeText('',ls-1,a,'end');codeChanged();}
});
code.oninput=codeChanged;
code.addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key==='Enter'){e.preventDefault();start();}});
function selectExample(){const ex=examples.find(e=>e.id===$('#example').value);code.value=ex.code;$('#example-note').textContent=ex.note;codeChanged();}
$('#example').onchange=selectExample; selectExample();
$('#save').onclick=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([code.value+'\n'],{type:'text/plain;charset=utf-8'}));a.download='doom.dh';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);};
$('#open').onchange=async e=>{const f=e.target.files[0];if(!f)return;code.value=(await f.text()).replace(/\r/g,'').replace(/\n$/,'');codeChanged();e.target.value='';};
$('#run').onclick=()=>start();

/* ---------- 출전 규약 ---------- */
const MAPS=['Hangar','Nuclear Plant','Toxin Refinery','Command Control','Phobos Lab','Central Processing','Computer Station','Phobos Anomaly','Military Base'];
const SKILLS=["I'm too young to die","Hey, not too rough",'Hurt me plenty','Ultra-Violence','Nightmare!'];
const FIELDS=[
  {key:'m',name:'스테이지',min:1,max:9,def:1},
  {key:'k',name:'난이도',min:1,max:5,def:3},
  {key:'h',name:'체력',min:1,max:200,def:100},
  {key:'a',name:'방어구',min:0,max:200,def:0},
  {key:'g',name:'IDDQD',min:0,max:1,def:0},
  {key:'f',name:'IDKFA',min:0,max:1,def:0}
];
const DEF=Object.fromEntries(FIELDS.map(f=>[f.key,f.def]));
function parseSortie(out){
  const tok=out.split(/\s+/).filter(Boolean).map(Number);
  if(!tok.length) return {set:{...DEF},note:'출력이 없어 기본값 1 3 100 0 0 0으로 나선다.'};
  if(tok.length!==FIELDS.length) return {err:`정수를 ${tok.length}개 출력했다. 스테이지 · 난이도 · 체력 · 방어구 · IDDQD · IDKFA, 여섯 개를 차례로 출력하자.`};
  const set={};
  for(let i=0;i<FIELDS.length;i++){const f=FIELDS[i],v=tok[i];
    if(!Number.isInteger(v)||v<f.min||v>f.max) return {err:`${i+1}번째 값 ${f.name} ${v}은 쓸 수 없다. ${f.min}부터 ${f.max}까지만 된다.`};
    set[f.key]=v;}
  return {set};
}
const onoff=v=>v?'켬':'끔';
function setCard(s){
  $('#set-card').innerHTML=[['스테이지','E1M'+s.m],['난이도',s.k+' · '+SKILLS[s.k-1]],['체력',s.h],['방어구',s.f?'200 (IDKFA)':s.a],['IDDQD',onoff(s.g)],['IDKFA',onoff(s.f)]]
    .map(([a,b])=>`<div><span>${a}</span><strong title="${String(b).replace(/"/g,'&quot;')}">${b}</strong></div>`).join('');
  $('#stamp-map').innerHTML=`E1M${s.m} <span>스테이지</span>`;$('#stamp-skill').innerHTML=`${s.k} <span>난이도</span>`;
  $('#poster-map').textContent=`E1M${s.m} · ${MAPS[s.m-1]}`;
}
const result=(t,kind)=>{const r=$('#result');r.textContent=t;r.dataset.kind=kind||'';};
const status=(t,kind)=>{const s=$('#status');s.textContent=t;s.dataset.kind=kind||'';};

/* ---------- 휴대폰·태블릿: 엔진은 띄우되, 키보드가 필요하다고 강조한다 ---------- */
const TOUCH_ONLY=matchMedia('(pointer:coarse)').matches&&!matchMedia('(any-pointer:fine)').matches;
document.documentElement.classList.toggle('touch-only',TOUCH_ONLY);

/* ---------- 엔진 틀 ---------- */
let frame=null, current=null;
const screen=$('#screen'), poster=$('#poster'), pill=$('#focus-pill');
function setFocus(on){pill.dataset.on=String(on);pill.textContent=on?'키보드: 게임':'키보드: 코드';}
function launch(s){
  stop(true);
  current=s;
  const hash=FIELDS.map(f=>f.key+'='+s[f.key]).join('&');
  frame=document.createElement('iframe');
  frame.className='doom-frame'; frame.title='동현둠 게임 화면 (E1M'+s.m+')';
  frame.setAttribute('allow','autoplay; fullscreen');
  frame.src='./doom/game.html#'+hash;
  frame.addEventListener('load',()=>giveFocus());
  poster.hidden=true; screen.append(frame);
  ['#stop','#full'].forEach(id=>$(id).disabled=false);
  status(`E1M${s.m} ${MAPS[s.m-1]}을 불러오는 중`);
}
function giveFocus(){ if(!frame)return; try{frame.contentWindow.focus();const c=frame.contentDocument&&frame.contentDocument.getElementById('canvas');if(c)c.focus();}catch(e){frame.focus();} }
function stop(silent){
  if(isFull()) exitFull();
  if(frame){frame.remove();frame=null;}
  poster.hidden=false; setFocus(false);
  ['#stop','#full'].forEach(id=>$(id).disabled=true);
  if(!silent) status('끝냈다 · 다시 출전할 수 있다');
}
addEventListener('message',e=>{
  if(!frame||e.source!==frame.contentWindow||!e.data||e.data.type!=='dh-doom')return;
  const d=e.data;
  if(d.state==='started') status(`E1M${current.m} ${MAPS[current.m-1]} · 난이도 ${current.k}${current.g?' · IDDQD':''}${current.f?' · IDKFA':''}`);
  else if(d.state==='focus') setFocus(true);
  else if(d.state==='blur') setFocus(false);
  else if(d.state==='error') status('엔진 오류: '+d.detail,'error');
});
code.addEventListener('focus',()=>setFocus(false));
$('#stop').onclick=()=>stop(false);
/* 전체 화면: 게임 틀이 아니라 화면 칸 전체를 띄워 '닫기' 단추를 함께 보인다. 게임 안의 Esc는 둠 메뉴를 연다. */
const fullEl=()=>document.fullscreenElement||document.webkitFullscreenElement;
/* iPhone Safari처럼 요소 전체 화면을 못 쓰는 곳에서는 화면 칸을 창 가득 채운다(유사 전체 화면). */
const canNativeFull=!!((document.fullscreenEnabled||document.webkitFullscreenEnabled)&&(screen.requestFullscreen||screen.webkitRequestFullscreen));
const isPseudo=()=>screen.classList.contains('pseudo-full');
const isFull=()=>fullEl()===screen||isPseudo();
function setPseudo(on){ screen.classList.toggle('pseudo-full',on); document.documentElement.classList.toggle('pseudo-full-on',on); onFull(); }
function exitFull(){ if(isPseudo()) return setPseudo(false); (document.exitFullscreen||document.webkitExitFullscreen||(()=>{})).call(document); }
let hintTimer=0;
function onFull(){ const on=isFull(); $('#exit-full').hidden=!on; $('#full').textContent=on?'전체 화면 닫기':'전체 화면';
  clearTimeout(hintTimer); $('#full-hint').hidden=!on; if(on) hintTimer=setTimeout(()=>$('#full-hint').hidden=true,5000);
  setTimeout(giveFocus,50); }
document.addEventListener('fullscreenchange',onFull); document.addEventListener('webkitfullscreenchange',onFull);
$('#exit-full').onclick=exitFull;
$('#full').onclick=()=>{ if(!frame)return; if(isFull()) return exitFull();
  if(!canNativeFull) return setPseudo(true);
  try{ const r=screen.requestFullscreen?screen.requestFullscreen():screen.webkitRequestFullscreen();
    if(r&&r.catch) r.catch(()=>setPseudo(true)); }catch(e){ setPseudo(true); } };

function start(){
  let out;
  try{ out=Donghyun.run(code.value,{maxSteps:300000}).output; }
  catch(e){ result(`동현랭 오류${e.line?` (${e.line}줄)`:''}: ${e.message}`,'error'); status('동현랭 오류','error'); return; }
  const p=parseSortie(out);
  if(p.err){ result('동현둠 규약 오류: '+p.err,'error'); status('규약 오류','error'); return; }
  const s=p.set; setCard(s);
  result((p.note?p.note+' ':'')+`E1M${s.m} ${MAPS[s.m-1]} · 난이도 ${s.k} · 체력 ${s.h} · 방어구 ${s.f?200:s.a}${s.g?' · IDDQD 무적':''}${s.f?' · IDKFA 무기·열쇠':''}. 이 설정으로 나선다. 게임 화면을 누르면 키보드가 게임으로 간다.${TOUCH_ONLY?' 이 기기에서는 블루투스 키보드를 연결해야 움직일 수 있다.':''}`);
  launch(s);
}
$('#poster-run').onclick=()=>start();

/* 첫 화면: 예제 01의 값을 보여 주고, 엔진은 출전을 누를 때 불러온다 */
(function preview(){try{const p=parseSortie(Donghyun.run(code.value,{maxSteps:300000}).output);if(p.set)setCard(p.set);}catch(e){setCard(DEF);}})();
if(typeof window!=='undefined') window.DoomLab={parseSortie,FIELDS};
})();
