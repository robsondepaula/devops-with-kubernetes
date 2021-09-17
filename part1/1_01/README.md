# Building the image
```
docker build . -t robsondepaula/main-app:1_01
```
# Publish to Docker Hub
```
docker push robsondepaula/main-app:1_01
```
# Test as docker container
```
docker run --name nodejs-main-app -d robsondepaula/main-app:1_01
```
```
docker logs <container-id>
```
# Kubernetes
Deploy to cluster:
```
kubectl create deployment nodejs-main-app --image=robsondepaula/main-app:1_01
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
kubectl logs -f nodejs-main-app-86f4c5f99-vklms
```