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
Create an address so that the frontend can call the backend:
```
gcloud compute addresses create project-ip --global
```

## Github actions
On this exercise [3_05.yml](../../.github/workflows/3_05.yml) should fully automate the requirements from the exercise.

# Clean-up
Avoid unnecessary costs when finished by deleting the images in the container registry. List them:
```
gcloud container images list --repository=gcr.io/dwk-gke-328814
```
And delete with:
```
gcloud container images delete [HOSTNAME]/[PROJECT-ID]/[IMAGE]@[IMAGE_DIGEST]
```
The cluster itself:
```
gcloud container clusters delete dwk-cluster --zone=us-central1
```
And also dispose of the address:
```
gcloud compute addresses delete project-ip --global
```
