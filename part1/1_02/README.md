# Building the image
```
docker build . -t robsondepaula/project-service
```
# Publish to Docker Hub
```
docker push robsondepaula/project-service
```
# Test as docker container
```
docker run --name nodejs-project-service -d robsondepaula/project-service
```
```
docker logs <container-id>
```
# Kubernetes
Deploy to cluster:
```
kubectl create deployment nodejs-project-service --image=robsondepaula/project-service
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
kubectl logs -f 
```