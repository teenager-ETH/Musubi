#!/bin/bash
DIR_PATH=$(dirname $0)

cd $DIR_PATH

exec  1> $"logfile"
exec  2> $"errors"

START=$(date +%s.%2N)

npx hardhat test

END=$(date +%s.%2N)
runtime=$(echo "$END - $START" | bc)

echo -e "\nruntime" $runtime

echo -e "\n*-COMPILEBOX::REPORTER-START-*"
cat reporter.json
echo -e "\n*-COMPILEBOX::REPORTER-END-*"

echo -e "\n*-COMPILEBOX::ENDOFOUTPUT-*"

mv logfile completed