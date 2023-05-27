#!/bin/bash


echo 'What is your subdomain? Example: 1bd6-73-75-45-179.ngrok.io'
read DOMAIN
export NEXT_PUBLIC_PROXY_DOMAIN=$DOMAIN

abspath() {                                               
    cd "$(dirname "$1")"
    printf "%s/%s\n" "$(pwd)" "$(basename "$1")"
    cd "$OLDPWD"
}

mkcert localhost
sudo pkill -9 -f "nginx"
sudo nginx -c $(abspath "nginx.conf") &

bash dev.sh