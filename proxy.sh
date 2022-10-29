#!/bin/bash


echo 'What is your ngrok subdomain?'
read DOMAIN
export PROXY_ROOT_DOMAIN=$DOMAIN

abspath() {                                               
    cd "$(dirname "$1")"
    printf "%s/%s\n" "$(pwd)" "$(basename "$1")"
    cd "$OLDPWD"
}

mkcert localhost
sudo pkill -9 -f "nginx"
sudo nginx -c $(abspath "nginx.conf") &

bash start.sh