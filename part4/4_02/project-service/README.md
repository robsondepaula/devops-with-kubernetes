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
curl http://localhost:3001/todos
```

# Building the image
```
docker build . -t robsondepaula/project-service:4_02
```
# Publish to Docker Hub
```
docker push robsondepaula/project-service:4_02
```
