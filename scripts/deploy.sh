#!/bin/sh

# Exit the script on any command with non 0 return code
set -e

# Deploy only on actual deployment events.

if [ "${CI_BUILD_TARGET}" = "test" ]; then
    yarn clean
    yarn build:test
    yarn deploy:test
fi

if [ "${CI_BUILD_TARGET}" = "production" ]; then
    yarn clean
    yarn build:prod
    yarn deploy:prod
fi
