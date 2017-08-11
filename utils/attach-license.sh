#!/usr/bin/env bash

# Usage:
# $ find src -name "*.js" | xargs -I{} ./utils/attach-license.sh {} contributors.csv

PUBLISH_YEAR=2017

function getSedForNames() {
    local cmd='sed'

    while read line
    do
        cmd="${cmd} -e 's/$(echo $line | cut -d ',' -f 1)/$(echo $line | cut -d ',' -f 2)/'"
    done <<< "$(cat $1)"

    echo $cmd
}

function getCopyrights() {
    IFS='
'

    if [ $# -gt 1 ] && [ -f $2 ]; then
        local sedNames=`getSedForNames $2`
    else
        # Do nothing
        local sedNames='tee'
    fi

    local filename=$1
    local cmdContributors="git log --follow --pretty=format:'%an' ${filename} | ${sedNames} | sort | uniq -c -f 1 | sort -k1nr | sed -e 's/^[ ]*[0-9]* //'"
    local contributors=($(eval $cmdContributors))

    local copyrights=''
    for ((i=0;i<${#contributors[@]};i++)); do
        local copyright=$PUBLISH_YEAR" "$(echo ${contributors[i]})

        if [ $i -eq 0 ]; then
            copyrights=${copyright}
        else
            copyrights=${copyrights}"\n"${copyright}
        fi
    done

    echo -e $copyrights | sed -E 's/^(.*)/Copyright \1/'
}

function getASLDescription() {
    IFS=

    local filename=$1
    local authorNameMappings=$2

    copyrights=`getCopyrights $filename $authorNameMappings`

    local body="

Licensed under the Apache License, Version 2.0 (the \"License\");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an \"AS IS\" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
"

    echo -e ${copyrights}${body}
}

function convertToJSComment() {
    IFS=

    local header="/**"
    local body=`echo -e $1 | sed -E 's/^(.*)$/ * \1/' | sed -E 's/[ ]+$//'`
    local footer=" */"
    echo -e ${header}"\n"${body}"\n"${footer}
}

IFS=

LICENSEDESC=`getASLDescription $1 $2`
LICENSECOMMENT=`convertToJSComment $LICENSEDESC`

echo $(echo -e ${LICENSECOMMENT}"\n" | cat - $1) > $1
