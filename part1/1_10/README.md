# Kubernetes
Command used to create the cluster (if not already):
```
k3d cluster create -p 8081:80@loadbalancer --agents 2
```
Create the deployment and the service:
```
kubectl apply -f manifests/
```
Test:
```
curl http://localhost:8081/
```