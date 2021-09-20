# Testing
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
curl http://localhost:3000/
```
# Building the image
```
docker build . -t robsondepaula/pingpong:2_07
```
# Publish to Docker Hub
```
docker push robsondepaula/pingpong:2_07
```
