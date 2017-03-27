#!/usr/bin/env bash

# Development scripts
sequelize db:migrate --config src/config/config.js --env development --migrations-path src/migrations
echo "\n\n\033[0;37m::::::::::\033[0;32mRUNNING IN DEVELOPMENT\033[0;37m::::::::::";
nodemon --exec babel-node src/server/index.js