#!/bin/sh

# Exit the script on any command with non 0 return code
set -e

if [ "${DRONE}" = "true" ]; then
    env
    yarn clean
    yarn build:prod
    yarn deploy:netlify
fi
