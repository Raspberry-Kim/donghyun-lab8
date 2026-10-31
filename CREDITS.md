# 동현둠™: 출처·이용 안내

## 게임 엔진

- **doom-wasm** — Cloudflare, GNU GPL 2.0 또는 그 이후 판. https://github.com/cloudflare/doom-wasm (커밋 `65e0d3ae2ffa604155eebd96ed40da6567bd08f4`)
- **Chocolate Doom** — Simon Howard 외, GNU GPL 2.0 또는 그 이후 판. https://github.com/chocolate-doom/chocolate-doom
- **DOOM 소스 코드** — id Software, GNU GPL 2.0 또는 그 이후 판. https://github.com/id-Software/DOOM
- 동현둠은 엔진을 고쳤다. 동현랭 값을 받는 명령줄 인자(`-dhhealth` `-dharmor` `-dhgod` `-dhkfa`), 맵마다 무기 6종과 최소 탄약(총알 100·산탄 20·로켓 10) 주기, 게임 중 치트 입력 끄기(IDDT 포함), 빌드 설정이다. 고친 소스 전체는 `engine/doom-wasm/`, 고친 부분은 `engine/donghyun-doom.patch`, 빌드 방법(Emscripten 3.1.1)은 `engine/build.sh`에 있다. GPL 2.0에 따라 고친 소스를 함께 나눈다.

## 게임 자료

- **DOOM1.WAD (Shareware v1.9)** — © 1994 id Software. MD5 `f0cefca49926d00903cf57551d901abe`. 고치지 않은 원래 파일을 Debian 꾸러미 원본에서 가져왔다 (http://deb.debian.org/debian/pool/non-free/d/doom-wad-shareware/doom-wad-shareware_1.9.fixed.orig.tar.gz).
- 이용 조건: Shareware 파일은 고치지 않으면 자유롭게 나눌 수 있지만 돈을 받고 나눌 수 없다. John Carmack의 회신이 Debian 저작권 파일에 실려 있다 (https://metadata.ftp-master.debian.org/changelogs/non-free/d/doom-wad-shareware/unstable_copyright). Raphael Quinet의 정리도 참고했다 (https://people.montefiore.uliege.be/quinet/games/sellingwads-en.html). 원문은 [licenses/DOOM1-WAD-LICENSE.txt](licenses/DOOM1-WAD-LICENSE.txt).
- 이 파일은 GPL이 아니며, 동현둠 저장소의 GPL은 이 파일에 미치지 않는다.

## 맵 이름

- 에피소드 1 맵 이름은 원작의 이름이다 (https://doom.fandom.com/wiki/Knee-Deep_in_the_Dead, https://www.classicdoom.com/partimes.htm).

## 상표

- DOOM은 id Software(ZeniMax Media)의 상표다. 동현둠은 id Software·ZeniMax·Bethesda·Microsoft·Cloudflare와 관계가 없고 승인도 받지 않은 비상업 취미 작품이다.

## 동현둠이 새로 만든 것

- 화면(`src/index.html`, `src/style.css`, `src/app.js`), 동현랭 출전 규약과 예제(`src/examples.js`), 엔진 띄우기(`doom/game.html`, `doom/default.cfg`), 엔진 수정, 시험(`qa/`), 문서.
- 동현랭 실행기(`src/donghyun.js`)는 [동현랭 저장소](https://github.com/Raspberry-Kim/donghyun-lang)의 v1.53을 고치지 않고 썼다.

## 이용 조건

- **동현둠 저장소 전체:** GNU GPL 2.0 또는 그 이후 판 ([COPYING](COPYING)). 엔진 소스가 「2판 또는 (원하면) 그 이후 판」으로 나왔기 때문이다. 저작권 © 2026 김동현(동현둠이 새로 만든 부분).
- **동현랭 실행기:** MIT ([licenses/DONGHYUN-MIT.txt](licenses/DONGHYUN-MIT.txt)).
- **DOOM1.WAD:** id Software의 사용 허락(위).
- **글꼴:** Black Han Sans, Nanum Gothic Coding, Pretendard — SIL Open Font License 1.1 ([licenses](licenses/)).
