# Local Kubernetes using k3d
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
## Step-by-step setup
1. Create the namespace
```
kubectl apply -f dependencies/namespace.yaml
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
kubectl get secrets -n=project-namespace
```
4. Deploy the dependencies with kustomize:
```
kubectl apply -k dependencies/.
```
## Step-by-step deployment
1. Make sure the dependencies are ready and only then deploy the project:
```
kubectl apply -k manifests/.
```
2. Monitor the deployment state:
```
watch -n 1 "kubectl get po -n=project-namespace"
```

Once the pod is on running state, open http://localhost:8081 to view it in the browser.