
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
Forward the port:
```
kubectl port-forward project-dep-745767d4cf-cl5rp 3003:80
```
Open [http://localhost:3003](http://localhost:3003) to view it in the browser.