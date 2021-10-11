#!/bin/sh

TO_DO=`curl -sI https://en.wikipedia.org/wiki/Special:Random | grep -Fi location | awk 'BEGIN{RS="\r\n";}{print $2}'`
echo '{"content": "'"$TO_DO"'"}'

echo "Going to POST to http://$TODO_ENDPOINT/todos"

curl -X POST http://$TODO_ENDPOINT/todos -H "Content-Type: application/json" -d '{ "content": "'"$TO_DO"'" }'
