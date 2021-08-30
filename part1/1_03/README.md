
# Kubernetes
Command used to create the cluster (if not yet created):
```
k3d cluster create -p 8081:80@loadbalancer --agents 2
```
Create the deployment and the service:
```
kubectl apply -f manifests/
```
Verify deploymenet is ready:
```
kubectl get deployments
```
Verify pod is running:
```
kubectl get pods
```
Check logs emanating from the container running inside the pod:
```
kubectl logs -f main-dep-5788f9865c-dm72b
```