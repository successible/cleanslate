#!/bin/bash

if [[ $1 == "--format" ]]; then
    echo "=> Running Prettier in write mode"
    npx prettier --write --cache src
fi

echo "=> Compiling src with TypeScript..."

cd src && npx tsc 

echo "=> TypeScript compiled /src successfully!"

cd ..

echo "=> Compiling src with Biome..."

npx biome check .

echo "=> All checks passed with Biome..."
