#!/bin/bash

# Replace version numbers in JS href strings
function replace() {
  sed -i.bak "s/groundworkjs\/[0-9A-Za-z.]*\/groundwork/groundworkjs\/$1\/groundwork/g" $2
  rm -rf $2.bak
}

# Replace CDN link versions in README
replace $1 README.md
