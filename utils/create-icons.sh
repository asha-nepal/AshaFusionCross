#!/bin/bash

CWD=`dirname "${0}"`
APP_ROOT="`cd "${CWD}/../";pwd`"
SRC=$APP_ROOT/assets/img/logo.svg
DST_DIR=$APP_ROOT/assets/icons/AshaFusionCross.iconset/
sizes=(16 32 128 256 512 1024)

mkdir -p $DST_DIR
for i in "${sizes[@]}"
do
    SIZE=${i}x${i}
    SIZE2X=$((i*2))x$((i*2))
    convert -background none -size $SIZE -extent $SIZE -gravity center $SRC $DST_DIR/icon_$SIZE.png
    convert -background none -size $SIZE2X -extent $SIZE2X -gravity center $SRC $DST_DIR/icon_$SIZE@2x.png
done

iconutil -c icns $DST_DIR
rm -rf $DST_DIR
