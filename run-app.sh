#!/bin/bash

nohup nodemon app.js 1>nodemon-stdout.log 2>nodemon-stderr.log &
