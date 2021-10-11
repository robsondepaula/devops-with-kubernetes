#!/usr/bin/env bash

# curl -sI https://en.wikipedia.org/wiki/Special:Random 

# curl -sI https://en.wikipedia.org/wiki/Special:Random | grep -Fi location

# curl -sI https://en.wikipedia.org/wiki/Special:Random | grep -Fi location | awk 'BEGIN{RS="\r\n";}{print $2}'

# curl -sI https://en.wikipedia.org/wiki/Special:Random | grep -Fi location | awk 'BEGIN{RS="\r\n";}{print $2}' | read todo; echo '{"content": "'"$todo"'"}'

curl -sI https://en.wikipedia.org/wiki/Special:Random | grep -Fi location | awk 'BEGIN{RS="\r\n";}{print $2}' | read todo; curl -X POST http://localhost:3001/todos -H "Content-Type: application/json" -d '{ "content": "'"$todo"'" }'
