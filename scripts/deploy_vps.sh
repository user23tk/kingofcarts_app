#!/bin/sh
set -e
HOST=$1
rsync -av --exclude node_modules ./ $HOST:kingofcarts
ssh $HOST 'cd kingofcarts && docker-compose up -d --build'
