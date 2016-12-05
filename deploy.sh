#!/bin/bash

npm install
npm run build:prod

username=$(cat .env | grep user | cut -c 9-)
pass=$(cat .env | grep pass | cut -c 9-)

ncftp -u $username -p $pass check.ru <<END_SCRIPT
rm laravel/storage/framework/views/*.php
rm public_html/*.js
quit
END_SCRIPT

cp dist/index.html dist/home.blade.php
ncftpput -u $username -p $pass check.ru /laravel/resources/views dist/home.blade.php
ncftpput -u $username -p $pass check.ru /public_html dist/*
rm dist/home.blade.php
