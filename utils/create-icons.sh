#!/bin/bash

CWD=`dirname "${0}"`
APP_ROOT="`cd "${CWD}/../";pwd`"
SRC=$APP_ROOT/assets/img/logo.svg
DST=$APP_ROOT/assets/icons

convert_icon() {
    local size=$1
    local src=$2
    local dst=$3

    convert -background none -size $size -extent $size -gravity center $src $dst
}

create_mac() {
    local DST_DIR=$DST/mac/asha.iconset/
    local sizes=(16 32 128 256 512 1024)

    mkdir -p $DST_DIR
    for i in "${sizes[@]}"
    do
        local SIZE=${i}x${i}
        local SIZE2X=$((i*2))x$((i*2))
        convert_icon $SIZE $SRC $DST_DIR/icon_$SIZE.png
        convert_icon $SIZE2X $SRC $DST_DIR/icon_$SIZE@2x.png
    done

    iconutil -c icns $DST_DIR
    rm -rf $DST_DIR
}

create_win() {
    local DST_DIR=$DST/win
    local DST_FILE=$DST_DIR/asha.ico
    local SIZE="256x256"

    mkdir -p $DST_DIR
    convert_icon $SIZE $SRC $DST_FILE
}

create_png() {
    local DST_DIR=$DST/png
    local SIZE="1024x1024"
    local DST_FILE=$DST_DIR/1024x1024.png

    mkdir -p $DST_DIR
    convert_icon $SIZE $SRC $DST_FILE
}

create_win
create_mac
create_png
