# 동현둠 v0.1

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.23793861.svg)](https://doi.org/10.5281/zenodo.23793861)

둠(DOOM) Shareware 에피소드 1 「Knee-Deep in the Dead」를 브라우저에서 한다. **스테이지·난이도·체력·방어구**와 치트 **IDDQD·IDKFA**는 동현랭 코드로 정하고, 싸움은 키보드로 한다. 무기 6종(주먹·전기톱·권총·산탄총·기관총·로켓 발사기)은 처음부터 모두 들고 있다.
동현 시리즈의 아홉 번째 작은 실험이다.

바로 하기: https://raspberry-kim.github.io/donghyun-lab8/

## 동현둠 규약

동현랭 코드가 출력한 **정수 여섯**이 차례로 출전 설정이다.

| 차례 | 뜻 | 범위 | 기본값 |
|---|---|---|---|
| 1 | 스테이지(E1M1–E1M9) | 1–9 | 1 |
| 2 | 난이도(I'm too young to die … Nightmare!) | 1–5 | 3 |
| 3 | 체력 | 1–200 | 100 |
| 4 | 방어구 | 0–200 | 0 |
| 5 | IDDQD 무적 | 0·1 | 0 |
| 6 | IDKFA 무기·탄약·열쇠·방어구 200 | 0·1 | 0 |

- 출력이 없으면 기본값 `1 3 100 0 0 0`으로 나선다.
- 여섯 개가 아니거나 범위를 벗어나면 나서지 않고 오류를 알린다.
- 치트는 코드로만 켠다. 게임 중에 IDDQD·IDKFA·IDDT 등을 쳐도 듣지 않는다.
- 원작은 Nightmare!에서 치트를 막지만, 코드로 켠 IDDQD·IDKFA는 이 난이도에서도 듣는다.
- 맵이 시작될 때마다 무기 6종을 주고, 탄약이 모자라면 총알 100·산탄 20·로켓 10까지 채운다.
- 원작에서 E1M9는 E1M3의 비밀 출구로만 간다. 동현둠에서는 스테이지 9로 바로 나설 수 있다.

예제는 여섯이다: 기본(E1M1), 무적 산책(IDDQD), 포보스 이상(E1M8 · IDKFA), 체력 1(악몽), 비밀 맵 E1M9(200 · 200), 계산해서 정하기(체력 = 스테이지 × 25).

```
나는 동현이냐?
ㅋㅋ 스테이지 E1M1
뿡뿡 도옹~뿡뿡뿡
ㅋㅋ 난이도 3
뿡뿡 도오오옹~뿡뿡뿡
ㅋㅋ 체력 100
뿡뿡 도오오오오오오오오오옹 도오오오오오오오오오옹~뿡뿡뿡
ㅋㅋ 방어구 0
뿡뿡 도옹ㅠ~뿡뿡뿡
ㅋㅋ IDDQD 무적 0
뿡뿡 도옹ㅠ~뿡뿡뿡
ㅋㅋ IDKFA 0
뿡뿡 도옹ㅠ~뿡뿡뿡
동현이구나
```

## 조작

반드시 실제 키보드가 있어야 한다. 화면 단추나 터치 조작은 없고 마우스는 쓰지 않는다. 휴대폰·태블릿은 블루투스 키보드를 연결하면 할 수 있다. 데스크톱 화면에서의 이용을 권장한다.

전체 화면에서는 Esc가 게임 메뉴를 연다. 원래 화면으로 돌아오려면 오른쪽 위 「✕ 전체 화면 닫기」 단추(또는 아래 띠의 같은 단추)를 누른다. iPhone Safari처럼 요소 전체 화면을 지원하지 않는 브라우저에서는 게임 화면이 창 전체를 채우는 방식으로 연다. 주소창은 남을 수 있다.

| 키 | 하는 일 |
|---|---|
| `W` `S` | 앞·뒤 |
| `←` `→` | 돌기 |
| `A` `D` | 옆걸음 |
| `Space` | 쏘기 |
| `E` | 문·스위치 |
| `Shift` 누른 채 | 달리기 |
| `1` | 주먹 · 전기톱(누를 때마다 바뀜) |
| `2` `3` `4` `5` | 권총 · 산탄총 · 기관총 · 로켓 발사기 |
| `Tab` | 자동 지도 |
| `Esc` | 메뉴 |

게임 화면을 누르면 키보드가 게임으로 가고, 코드 칸을 누르면 다시 코드로 온다. 소리는 효과음만 난다(음악 장치 OPL의 초기화가 브라우저에서 멈춰 음악은 껐다). 브라우저 규칙 때문에 효과음은 게임 화면을 마우스로 한 번 클릭하거나(휴대폰·태블릿은 손가락으로 한 번 누르기) 게임 안에서 아무 키나 누른 뒤부터 난다.

## 파일 구성

- `index.html`: 화면·편집기·문서·글꼴·아이콘을 묶은 한 장(약 3.9MB, `node build.cjs`로 만든다).
- `doom/`: 게임 엔진(`websockets-doom.js`·`.wasm`), 엔진을 띄우는 `game.html`, 키 설정 `default.cfg`, Shareware 자료 `doom1.wad`. 출전을 누를 때만 불러온다.
- `engine/`: 고친 엔진 소스 전체(`doom-wasm/`), 고친 부분(`donghyun-doom.patch`), 빌드 방법(`build.sh`).
- `src/`: 화면 원본. `licenses/`: 라이선스 원문.

엔진과 WAD를 base64로 넣어 완전한 단일 HTML로 만들지 않았다. 한 장이 12MB를 넘어 첫 화면이 느려지고, Shareware 파일을 고치지 않은 원래 파일로 함께 둔다는 조건과 GPL 엔진의 경계가 흐려지기 때문이다.

## 엔진

[Cloudflare doom-wasm](https://github.com/cloudflare/doom-wasm)(커밋 `65e0d3a`)을 고쳐 썼다. doom-wasm은 [Chocolate Doom](https://github.com/chocolate-doom/chocolate-doom)을 WebAssembly로 옮긴 것이고, 바탕은 id Software가 공개한 [둠 소스 코드](https://github.com/id-Software/DOOM)다.

고친 곳:

- `p_mobj.c`: 명령줄 인자 `-dhhealth` `-dharmor` `-dhgod` `-dhkfa`를 받아 플레이어가 나타날 때 적용하고, 무기 6종과 최소 탄약을 준다.
- `st_stuff.c`, `am_map.c`: 게임 중 치트 입력(자동 지도 IDDT 포함)을 끈다.
- `configure.ac`: 빌드 설정(`-O3`, 내보낼 함수).

빌드에는 **Emscripten 3.1.1**이 필요하다. 새 Emscripten(6.x)으로 묶으면 게임 상태가 깨진다(화면이 검고 `PLAYER 4 LEFT THE GAME`이 뜬다). 자세한 순서는 `engine/build.sh`.

## 빌드와 시험

```
node build.cjs            # dist/와 루트 index.html(GitHub Pages용) 생성
node qa/core-tests.cjs    # 예제 출력, 규약 판정, WAD MD5 확인
```

엔진은 브라우저에서 스테이지·난이도·체력·방어구·IDDQD(무적 얼굴)·IDKFA(방어구 200·열쇠·탄약)가 듣는지, 게임 중에 친 iddqd·idkfa가 듣지 않는지 확인했다.

## 라이선스와 권리

- **저장소 전체(동현둠 화면·문서·엔진 수정 포함):** GNU GPL 2.0 또는 그 이후 판 ([COPYING](COPYING)). 엔진과 함께 나가기 때문이다.
- **동현랭 실행기(`src/donghyun.js`):** MIT ([licenses/DONGHYUN-MIT.txt](licenses/DONGHYUN-MIT.txt)).
- **`doom/doom1.wad`:** © 1994 id Software. GPL이 아니다. 고치지 않은 Shareware v1.9 원래 파일(MD5 `f0cefca49926d00903cf57551d901abe`)이며, 고치지 않으면 나눌 수 있지만 돈을 받고 나눌 수 없다 ([licenses/DOOM1-WAD-LICENSE.txt](licenses/DOOM1-WAD-LICENSE.txt)).
- **글꼴:** Black Han Sans, 나눔고딕코딩, Pretendard — 각각 SIL OFL 1.1 (`licenses/`).
- DOOM은 id Software(ZeniMax Media)의 상표다. 동현둠은 id Software·ZeniMax·Bethesda·Microsoft·Cloudflare와 관계가 없고 승인도 받지 않은 비상업 취미 작품이다.

자세한 출처는 [CREDITS.md](CREDITS.md).

## 만든 사람

인하대학교 의과대학 김동현 교수는 백신학·감염학을 연구한다. 명랑하고 따뜻한 개발을 지향한다.
