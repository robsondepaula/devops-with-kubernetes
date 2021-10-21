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
4. Create an address so that the frontend can call the backend:
```
gcloud compute addresses create project-ip --global
``` 
5. Deploy the dependencies with kustomize:
```
kubectl apply -k dependencies/.
```
## Step-by-step deployment to GKE
1. Make sure the dependencies are ready and only then deploy the project:
```
kubectl apply -k manifests/.
```
2. Monitor that the ingress is available (might take a while):
```
kubectl get ingress project-ingress --output yaml -n=project-namespace
```
3. Retrieve the project-ip translation:
```
gcloud compute addresses describe project-ip --global
```
4. Since we are not paying for a DNS we are going to use the local machine hosts file to do the work. On a \*nix based system edit */etc/hosts* and add the entry:
```
<value output by step 3>    project-ip
```
5. Validate all is working well by navigating to http://project-ip

# Clean-up
Avoid unnecessary costs when finished:
```
gcloud container clusters delete dwk-cluster --zone=us-central1
```
And also dispose of the address:
```
gcloud compute addresses delete project-ip --global
```

# Github actions
The setup and deploy steps are automated using Github actions, provided the cluster exists. 

Since we are trying to minimize costs, make sure you have run:
```
gcloud container clusters create dwk-cluster --machine-type g1-small --zone=us-central1 --num-nodes 2
```
Before triggering the Github workflow and that you have setup the namespace and secret. The remaining steps are on the workflow.

When done, delete the cluster and the images uploaded to Google Container Registry.