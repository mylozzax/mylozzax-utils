#!/bin/sh

bin/build-emcpp.sh &&
cp build/MyLozzaxClient_WASM.js src/; 
cp build/MyLozzaxClient_WASM.wasm src/;