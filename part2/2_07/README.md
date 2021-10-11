# Kubernetes
Create the local directory (if not exist):
```
mkdir -p /tmp/kube
```
Command used to create the cluster (if not already):
```
k3d cluster create --volume /tmp/kube:/tmp/kube -p 8081:80@loadbalancer --agents 2
```
Create the local volme binding (if not exist):
```
docker exec k3d-k3s-default-agent-0 mkdir -p /tmp/kube
```
## Create the namespace
```
kubectl apply -f manifests/namespace.yaml
```
## SealedSecret CRD
If following this for the first time:

1. Install SealedSecret CRD, server-side controller into kube-system namespace:
```
kubectl apply -f https://github.com/bitnami-labs/sealed-secrets/releases/download/v0.16.0/controller.yaml
```
2. Navigate to the [secret](./secret) folder and follow the instruction on the README.
## Deploy to cluster
```
kubectl apply -f manifests/
```
You may need to either apply the files to have the DB available before the service or delete the app+svc deployment after the DB is ready, this way the service will connect to it gracefully.
## Test
```
curl http://localhost:8081/
2021-08-27T16:53:55.266Z : ee0f55a4-ec5d-4be0-a41e-16946672be0b
Ping / Pongs: 1%
...
```