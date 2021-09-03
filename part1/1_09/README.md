# Kubernetes
Command used to create the cluster (if not created):
```
k3d cluster create -p 8081:80@loadbalancer --agents 2
```
## Deploy to cluster
```
kubectl apply -f manifests/
```
## Test
```
curl http://localhost:8081/pingpong
"pong 0"
curl http://localhost:8081/pingpong
"pong 1"
...
```