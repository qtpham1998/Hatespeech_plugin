#!/usr/bin/env bash

echo "*** H8BL*CK.chromium: Creating zip package"

BLDIR=build
DES="$BLDIR"/chromium
mkdir -p $DES

echo "*** H8BL*CK-chromium: copying program files"
bash ./scripts/copy-files.sh  $DES

echo "*** H8BL*CK.chromium: copying chromium files"
cp platform/chromium/*.js          $DES/js/
cp platform/chromium/*.json        $DES/

zip -qr h8blck-chromium.zip $DES/*

echo "*** H8BL*CK-chromium: Package done."

rm -rf $DES
