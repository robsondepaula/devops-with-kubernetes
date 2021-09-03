
# Kubernetes
Delete previous ingresses (if needed):
```
kubectl delete ingress main-ingress
```
Command used to create the cluster (if needed):
```
k3d cluster create --port -p 8081:80@loadbalancer --agents 2
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
Once the pod is on running state, ppen [http://localhost:8081](http://localhost:8081) to view it in the browser.