#!/usr/bin/env bash
# 동현둠 엔진 빌드: engine/doom-wasm(고친 doom-wasm 소스)을 브라우저용으로 묶어 doom/에 넣는다.
# 원본: https://github.com/cloudflare/doom-wasm 커밋 65e0d3ae2ffa604155eebd96ed40da6567bd08f4
# 고친 내용: engine/donghyun-doom.patch
#
# 준비물: Emscripten 3.1.1, autoconf, automake, libtool, pkg-config
#   git clone https://github.com/emscripten-core/emsdk.git && cd emsdk
#   ./emsdk install 3.1.1 && ./emsdk activate 3.1.1 && source ./emsdk_env.sh
# 주의: 새 Emscripten(예: 6.x)으로 묶으면 게임 상태가 깨진다(화면이 검고 'PLAYER 4 LEFT THE GAME'이 뜬다).
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
cd "$here/doom-wasm"
emconfigure autoreconf -fi
ac_cv_exeext=".html" emconfigure ./configure --host=none-none-none
emmake make -j"$(nproc 2>/dev/null || echo 4)"
cp src/websockets-doom.js src/websockets-doom.wasm "$here/../doom/"
echo "doom/websockets-doom.js, doom/websockets-doom.wasm을 새로 만들었다."
