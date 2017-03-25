#!/usr/bin/env bash

# Test scripts
npm run build
sequelize db:migrate --config dist/config/config.js --env test --migrations-path dist/migrations
echo "\n\n\033[0;37m::::::::::\033[0;32mRUNNING TESTS\033[0;37m::::::::::";
NODE_ENV=test mocha dist/test/*
sequelize db:migrate:undo:all --config dist/config/config.js --env test --migrations-path dist/migrations
npm run clean