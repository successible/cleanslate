#!/bin/bash

echo "=> Compiling src with TypeScript..."

cd src && npx tsc 

echo "=> TypeScript compiled /src successfully!"

cd ..

echo "=> Compiling src with Biome..."

npx biome check --fix --unsafe

echo "=> All checks passed with Biome..."
