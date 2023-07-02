#!/bin/bash

VERSION=$(git rev-parse --short HEAD)
export NEXT_PUBLIC_VERSION=$VERSION

rm -rf build

pnpm install --prod

cd src
npx next build
npx next export -o out

npx workbox generateSW workbox-config.js
cp -r out ../build
cd ..

cp build/service-worker.js build/sw.js
cp build/service-worker.js.map build/sw.js.map
sed -i "s/(NEXT_PUBLIC_HASURA_DOMAIN)/$NEXT_PUBLIC_HASURA_DOMAIN/g" 'build/_headers'

echo $VERSION > build/version.txt