#!/bin/sh
set -e
if [ ! -f /etc/nginx/certs/server.crt ]; then
  mkdir -p /etc/nginx/certs
  openssl req -x509 -nodes -newkey rsa:2048 -days 365 \
    -keyout /etc/nginx/certs/server.key \
    -out /etc/nginx/certs/server.crt \
    -subj "/CN=localhost"
fi
exec nginx -g 'daemon off;'
