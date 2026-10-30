/* 동현둠 예제. 동현랭이 출력한 정수 여섯 개가 차례로 스테이지 · 난이도 · 체력 · 방어구 · IDDQD · IDKFA다. */
function expression(n){
  if(n===0)return '도옹ㅠ';
  if(n<0)return 'ㅠ '+expression(-n);
  if(n<=10)return '도'+'오'.repeat(n-1)+'옹';
  for(let a=10;a>=2;a--)if(n%a===0)return expression(a)+' '+expression(n/a);
  return '도'+'오'.repeat(n-1)+'옹';
}
const output=n=>'뿡뿡 '+expression(n)+'~뿡뿡뿡';
const wrap=a=>['나는 동현이냐?',...a,'동현이구나'].join('\n');
const LABELS=['스테이지 E1M','난이도','체력','방어구','IDDQD 무적','IDKFA 무기·열쇠'];
const sortie=(label,v)=>wrap(['ㅋㅋ '+label,...v.flatMap((n,i)=>['ㅋㅋ '+LABELS[i]+(i===0?n:' '+n),output(n)])]);
const examples=[
 {id:'basic',title:'01 · 기본 (E1M1 · 보통)',note:'E1M1 격납고, 난이도 3(Hurt me plenty), 체력 100, 방어구 0. 치트는 쓰지 않는다. 무기 6종은 늘 들고 시작한다.',code:sortie('기본 출전',[1,3,100,0,0,0])},
 {id:'tour',title:'02 · 무적 산책 (IDDQD)',note:'E1M1을 가장 쉬운 난이도로, IDDQD 무적을 켜고 둘러본다. 맞아도 체력이 줄지 않는다.',code:sortie('무적 산책',[1,1,100,0,1,0])},
 {id:'keys',title:'03 · 포보스 이상 (IDKFA)',note:'E1M8 포보스 이상(Phobos Anomaly)을 Ultra-Violence로. IDKFA로 열쇠 셋, 탄약 가득, 방어구 200을 받는다.',code:sortie('포보스 이상 · IDKFA',[8,4,100,0,0,1])},
 {id:'glass',title:'04 · 체력 1 (악몽)',note:'Nightmare! 난이도에 체력 1. 한 대만 맞아도 쓰러진다. 원작에서는 이 난이도에서 치트가 막히지만, 동현랭 코드로 켜는 치트는 여기서도 듣는다.',code:sortie('체력 1 · 악몽',[1,5,1,0,0,0])},
 {id:'secret',title:'05 · 비밀 맵 E1M9 (200 · 200)',note:'원래는 E1M3의 비밀 출구로만 가는 E1M9 군사 기지에 바로 나선다. 체력 200(10×20), 방어구 200으로 시작한다.',code:sortie('비밀 맵 · 체력 200 · 방어구 200',[9,3,200,200,0,0])},
 {id:'calc',title:'06 · 계산해서 정하기',note:'체력을 직접 계산한다. 체력 = 스테이지 × 25. 스테이지 4(E1M4 사령 통제실)라면 체력 100이다. 변수 동현(스테이지)을 동동현(체력) 계산에 다시 쓴다.',
  code:['나는 동현이냐?','ㅋㅋ 스테이지 4를 동현에 담는다','동현아 '+expression(4),'ㅋㅋ 스테이지','뿡뿡 동현~뿡뿡뿡','ㅋㅋ 난이도 3',output(3),'ㅋㅋ 체력 = 스테이지 × 25','동동현아 동현 '+expression(5)+' '+expression(5),'뿡뿡 동동현~뿡뿡뿡','ㅋㅋ 방어구 50',output(50),'ㅋㅋ IDDQD 0 · IDKFA 0',output(0),output(0),'동현이구나'].join('\n')}
];
if(typeof module!=='undefined')module.exports={examples,expression,LABELS};
