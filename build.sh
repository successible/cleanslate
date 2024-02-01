#!/bin/bash

cd src
npx next build

npx workbox generateSW workbox-config.js
cp -r out ../out
cd ..

cp out/service-worker.js out/sw.js
cp out/service-worker.js.map out/sw.js.map

echo $NEXT_PUBLIC_VERSION > out/version.txt