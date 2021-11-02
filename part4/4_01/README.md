# Local Kubernetes cluster
Create the local directory (if not exist):
```
mkdir -p /tmp/kube
```
Command used to create the cluster (if not already):
```
k3d cluster create --k3s-arg "--disable=traefik@server:0" --volume /tmp/kube:/tmp/kube -p 8081:80@loadbalancer --agents 2
```
Create the local volume binding (if not exist):
```
docker exec k3d-k3s-default-agent-0 mkdir -p /tmp/kube
```
## Step-by-step deployment
1. Create the namespace
```
kubectl apply -f manifests/namespace.yaml
```
2. Install SealedSecret CRD, server-side controller into kube-system namespace
```
helm repo add sealed-secrets https://bitnami-labs.github.io/sealed-secrets

helm install sealed-secrets --namespace kube-system --version 1.16.1 sealed-secrets/sealed-secrets
```
3. Generate the sealed secret:
```
kubeseal --controller-namespace kube-system \
    --controller-name sealed-secrets \
    -o yaml <secret/secret.yaml> secret/sealedsecret.yaml
```
Apply it so that it becomes available for usage in the cluster:
```
kubectl apply -f secret/sealedsecret.yaml
```
Check it is available:
```
kubectl get secrets -n=main-namespace
```
4. Deploy the configuration maps:
```
kubectl apply -f manifests/config
```
5. Make sure the config maps are ready and only then deploy the database:
```
kubectl apply -f manifests/db
```
6. Make sure the DB is ready and only then deploy the app:
```
kubectl apply -f manifests/app
```
7. Create the ingress:
```
kubectl apply -f manifests/ingress.yaml
```
8. Monitor the readiness probe:
```
watch -n 1 "kubectl get po -n=main-namespace" 
```
### End to end testing
```
curl http://localhost:8081/
```