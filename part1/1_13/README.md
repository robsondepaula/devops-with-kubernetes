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
## Deploy to cluster
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

# Notice
Since I have designed the "project" to be a React.JS frontend with a Node.JS backend there was no clean way to reach the shared volume fom React. Due to this reason I went ahead and implemented the frontend to backend communication using an API.