# Test
Navigate to [2_08/project-service](../../2_08/project-service)
Spin up a local Postgres database:
```
docker-compose up -d
```
Start the service:
```
node index.js
```
Make a request:
```
TODO_ENDPOINT=localhost:3001 ./random_todo.sh
```
# Building the image
```
docker build --no-cache . -t robsondepaula/cron-job-todo:2_09
```
# Publish to Docker Hub
```
docker push robsondepaula/cron-job-todo:2_09
```