# Building the image
```
docker build . -t robsondepaula/project-service:1_02
```
# Publish to Docker Hub
```
docker push robsondepaula/project-service:1_02
```
# Test as docker container
```
docker run --name nodejs-project-service -d robsondepaula/project-service:1_02
```
```
docker logs <container-id>
```
# Kubernetes
Deploy to cluster:
```
kubectl create deployment nodejs-project-service --image=robsondepaula/project-service:1_02
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
kubectl logs -f nodejs-project-service-966cf4fd9-845vj
```