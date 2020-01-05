#!/usr/bin/env bash

DES=$1

cp -R src/css                      $DES/
cp -R src/img                      $DES/
cp -R src/js                       $DES/
cp -R lib                          $DES/
cp -R src/csv                    $DES/
cp src/*.html                      $DES/
