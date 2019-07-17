#!/bin/sh

# Exit the script on any command with non 0 return code
set -e

if [ "${DRONE}" = "true" ]; then
    yarn clean

    if [ "${CI_BUILD_TARGET}" = "test" ]; then
        yarn build:test
        yarn deploy:test
    fi

    if [ "${CI_BUILD_TARGET}" = "production" ]; then
        yarn build:prod
        yarn deploy:prod
    fi

fi
