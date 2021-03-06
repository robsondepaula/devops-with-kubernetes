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
## Step-by-step deployment to GKE
1. Create the namespace
```
kubectl apply -f manifests/namespace.yaml
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
8. Retrieve the external IP address (might take a while to be available):
```
kubectl get ingress main-ingress --output yaml -n=main-namespace
```
9. Validate all is working well:
```
curl http://35.201.124.48
```
# Clean-up
Avoid unnecessary costs when finished:
```
gcloud container clusters delete dwk-cluster --zone=us-central1
```
