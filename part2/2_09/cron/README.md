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
curl http://localhost:3001/todos
```
Read the script.sh to understand how the create TODO was obtained.

# K8S service endpoint
Read about how k8s DNS works.
```
back-svc.project-namespace.svc.cluster.local:2346
```