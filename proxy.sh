#!/bin/bash

export PROXY_ROOT_DOMAIN=$1

NAME="tiger"
cloudflared login
cloudflared tunnel create $NAME
cloudflared tunnel route dns $NAME $NAME
cloudflared tunnel run --url https://localhost:3000 $NAME &

NAME="lion"
cloudflared login
cloudflared tunnel create $NAME
cloudflared tunnel route dns $NAME $NAME
cloudflared tunnel run --url http://localhost:8210 $NAME &

bash start.sh