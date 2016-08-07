#!/usr/bin/env bash
rm -rf docs
./node_modules/jsdoc/jsdoc.js \
  --configure node_modules/angular-jsdoc/common/conf.json \
  --template node_modules/angular-jsdoc/angular-template \
  --destination docs \
  --readme README.md \
  --recurse directive service init.js pages js