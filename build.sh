#!/bin/bash

cd src
npx next build

npx workbox generateSW workbox-config.js
cp -r build ../build
cd ..

cp build/service-worker.js build/sw.js
cp build/service-worker.js.map build/sw.js.map

echo $NEXT_PUBLIC_VERSION > build/version.txt