#!/bin/bash

if [[ $1 == "--format" ]]; then
    echo "=> Running Prettier in write mode"
    npx prettier --write --cache src
fi

echo "=> Compiling src with TypeScript..."

cd src && npx tsc 

echo "=> TypeScript compiled /src successfully!"

cd ..

npx prettier --check --cache src 

echo "=> All files in /src pass Prettier"

npx eslint src --fix --max-warnings 0

echo "=> All files in /src pass ESLint"
