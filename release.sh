#!/usr/bin/env bash

# Version key/value should be on its own line
export PACKAGE_VERSION=$(cat package.json \
                         | grep version \
                         | head -1 \
                         | awk -F: '{ print $2 }' \
                         | sed 's/[",]//g' \
                         | tr -d '[[:space:]]')

echo "\n@@@ Releasing v$PACKAGE_VERSION @@@"

# Create a release branch
git checkout -b "release-$PACKAGE_VERSION"

# Build the libs
npm run lib

# Commit the built files, make a version tag and push
git commit -a -m "Release v$PACKAGE_VERSION"
git push --set-upstream origin "release-$PACKAGE_VERSION"
git tag -a v$PACKAGE_VERSION -m "Release v$PACKAGE_VERSION"
git push origin v$PACKAGE_VERSION

unset PACKAGE_VERSION
