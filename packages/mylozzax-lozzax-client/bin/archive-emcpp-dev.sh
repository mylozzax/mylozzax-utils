#!/bin/sh

bin/build-emcpp-dev.sh &&
cp build/MyLozzaxClient_WASM.js src/; 
cp build/MyLozzaxClient_WASM.wasm src/;
cp build/MyLozzaxClient_WASM.wasm.map src/;