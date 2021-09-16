# Kubernetes
Command used to create the cluster (if not already):
```
k3d cluster create -p 8081:80@loadbalancer --agents 2
```
## Create the namespace
```
kubectl apply -f manifests/namespace.yaml
```
## Deploy to cluster
```
kubectl apply -f manifests/
```
## Test
```
curl http://localhost:8081/
2021-08-27T16:53:55.266Z : ee0f55a4-ec5d-4be0-a41e-16946672be0b
Ping / Pongs: 1%
...
```