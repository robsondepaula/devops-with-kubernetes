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
Verify deploymenet is ready:
```
kubectl get deployments --namespace=project-namespace
```
Verify pod is running:
```
kubectl get pods --namespace=project-namespace
```
Once the pod is on running state, open [http://localhost:8081](http://localhost:8081) to view it in the browser.
## Toubleshooting
A friendly reminder that the statefulset needs to be up and running before the service can connect to it.