#!/bin/bash

COMPOSE="docker-compose -f docker-compose.dev.yml --no-ansi"
DOCKER="/usr/bin/docker"

$COMPOSE run certbot renew && $COMPOSE kill -s SIGHUP ngnix
$DOCKER system prune -af
