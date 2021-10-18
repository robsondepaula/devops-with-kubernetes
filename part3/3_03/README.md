# Google Cloud
For record keeping purposes:
```
Your current project has been set to: [dwk-gke-328814].
```
After checking the lowest zone prices request the cluster creation. Number of nodes is specified to avoid having to request a quota increase:
```
gcloud container clusters create dwk-cluster --machine-type g1-small --zone=us-central1 --num-nodes 2
```
Fetch credentials and update kubeconfig:
```
gcloud container clusters get-credentials dwk-cluster --zone=us-central1
```
## Step-by-step GKE setup
1. Create the namespace
```
kubectl apply -f dependencies/namespace.yaml
```
2. Install SealedSecret CRD, server-side controller into kube-system namespace
```
kubectl apply -f https://github.com/bitnami-labs/sealed-secrets/releases/download/v0.16.0/controller.yaml
```
3. Generate the sealed secret:
```
kubeseal -o yaml <secret/secret.yaml> secret/sealedsecret.yaml
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
5. Deploy NGINX Ingress Controller:
```
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update
helm install nginx-ingress ingress-nginx/ingress-nginx
```
## Step-by-step deployment to GKE
1. Make sure the dependencies are ready and only then deploy the project:
```
kubectl apply -k manifests/.
```
2. Retrieve the external IP address (might take a while to be available):
```
kubectl get ingress project-ingress --output yaml -n=project-namespace
```
3. Validate all is working well by navigating to 35.226.117.207

# Clean-up
Avoid unnecessary costs when finished:
```
gcloud container clusters delete dwk-cluster --zone=us-central1
```
