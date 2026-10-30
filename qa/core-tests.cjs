// 동현둠 규약 시험: node qa/core-tests.cjs
// 예제 출력과 출전 규약 판정(개수·범위·기본값)을 확인한다. 엔진 동작은 브라우저에서 따로 확인했다.
const assert=require('assert'),fs=require('fs'),path=require('path');
const D=require('../src/donghyun.js');const {examples}=require('../src/examples.js');
// app.js는 브라우저용이므로 규약 부분(FIELDS·parseSortie)만 꺼내어 쓴다
const app=fs.readFileSync(path.join(__dirname,'../src/app.js'),'utf8');
const part=app.slice(app.indexOf('const FIELDS=['),app.indexOf('const onoff='));
const {FIELDS,parseSortie,DEF}=new Function(part+'\nreturn {FIELDS,parseSortie,DEF};')();
let n=0;const check=(name,f)=>{f();n++;console.log('ok',name);};
const run=c=>D.run(c,{maxSteps:300000}).output;
check('규약 여섯 칸과 기본값 1 3 100 0 0 0',()=>{assert.deepEqual(FIELDS.map(f=>f.key),['m','k','h','a','g','f']);assert.deepEqual(Object.values(DEF),[1,3,100,0,0,0]);});
check('출력이 없으면 기본값으로 나선다',()=>{const p=parseSortie('');assert(!p.err);assert.deepEqual(p.set,DEF);assert(p.note);});
check('여섯 개가 아니면 오류',()=>{assert(parseSortie('1 3 100 0 0').err);assert(parseSortie('1 3 100 0 0 0 0').err);assert(parseSortie('7').err);});
check('범위: 스테이지 1–9, 난이도 1–5, 체력 1–200, 방어구 0–200, 치트 0·1',()=>{
  const ok=s=>!parseSortie(s).err;
  assert(ok('1 1 1 0 0 0'));assert(ok('9 5 200 200 1 1'));
  for(const bad of ['0 3 100 0 0 0','10 3 100 0 0 0','1 0 100 0 0 0','1 6 100 0 0 0','1 3 0 0 0 0','1 3 201 0 0 0','1 3 100 -1 0 0','1 3 100 201 0 0','1 3 100 0 2 0','1 3 100 0 0 -1'])assert(!ok(bad),bad);});
check('정수가 아니면 오류',()=>{assert(parseSortie('1 3 100.5 0 0 0').err);});
check('예제 여섯의 출력',()=>{const want={basic:[1,3,100,0,0,0],tour:[1,1,100,0,1,0],keys:[8,4,100,0,0,1],glass:[1,5,1,0,0,0],secret:[9,3,200,200,0,0],calc:[4,3,100,50,0,0]};
  assert.equal(examples.length,6);
  for(const e of examples){const p=parseSortie(run(e.code));assert(!p.err,e.id);assert.deepEqual(Object.values(p.set),want[e.id],e.id);}});
check('예제 06: 체력 = 스테이지 × 25',()=>{const p=parseSortie(run(examples.find(e=>e.id==='calc').code));assert.equal(p.set.h,p.set.m*25);});
check('DOOM1.WAD는 고치지 않은 Shareware v1.9',()=>{const h=require('crypto').createHash('md5').update(fs.readFileSync(path.join(__dirname,'../doom/doom1.wad'))).digest('hex');assert.equal(h,'f0cefca49926d00903cf57551d901abe');});
console.log(n+' passed');
