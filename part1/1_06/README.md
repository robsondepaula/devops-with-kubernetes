
# Kubernetes
Delete previous cluster:
```
k3d cluster delete
```
Command used to create the cluster:
```
k3d cluster create --port '8082:30080@agent[0]' -p 8081:80@loadbalancer --agents 2
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
Once the pod is on running state, ppen [http://localhost:8082](http://localhost:8082) to view it in the browser.