#!/bin/sh
set -e

if [ "$1" == "" ]; then
  node /usr/src/app/index.js
else
  exec "$@"
fi

