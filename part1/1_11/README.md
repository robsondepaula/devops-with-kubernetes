# Ingress
For some reason, newer versions of the infra used in this course caused the exercises to no longer work.

After troubleshooting, the root cause was on the ingress controller and its classes.

This document was updated with a working solution.

# Kubernetes
Create the local directory (if not exist):
```
mkdir -p /tmp/kube
```
Create the cluster with no ingress controller and with a loadbalancer routing to two nodes:
```
k3d cluster create --k3s-arg "--disable=traefik@server:0" --volume /tmp/kube:/tmp/kube -p 8081:80@loadbalancer --agents 2
```
Create the local volume binding (if not exist):
```
docker exec k3d-k3s-default-agent-0 mkdir -p /tmp/kube
```
Add the helm chart for nginx ingress controller (if not done previously):
```
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update
```
Deploy the nginx ingress controller:
```
helm install ingress-nginx ingress-nginx/ingress-nginx
```
Verify the its status:
```
kubectl get pods -A
```
Which should output something like:
```
default       svclb-ingress-nginx-controller-2hpw5        2/2     Running   0          13s
default       svclb-ingress-nginx-controller-krg4z        2/2     Running   0          13s
default       svclb-ingress-nginx-controller-zc49l        2/2     Running   0          13s
default       ingress-nginx-controller-5c8d66c76d-kt9pt   0/1     Running   0          13s
```
Finally create the IngressClass resource:
```
kubectl apply -f dependencies/
```
## Deploy to cluster
```
kubectl apply -f manifests/
```
## Test
```
curl http://localhost:8081/pingpong
"Ping / Pongs: 1"
curl http://localhost:8081/
2021-08-27T16:53:55.266Z : ee0f55a4-ec5d-4be0-a41e-16946672be0b
Ping / Pongs: 1%
...
```