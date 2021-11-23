# DIY CRD & Controller

## Cluster setup
Use the convenience script [create_empty_cluster.sh](./create_empty_cluster.sh).

## Custom Resource Definition
Create the custom resource for the 'DummySite' assignment:
```
kubectl apply -f crd/custom-resource-definition.yaml
```
Check that all is well:
```
kubectl get crd
```
Must output something like:
```
NAME                                      CREATED AT
addons.k3s.cattle.io                      2021-11-23T14:37:49Z
helmcharts.helm.cattle.io                 2021-11-23T14:37:49Z
helmchartconfigs.helm.cattle.io           2021-11-23T14:37:49Z
dummies.stable.devopswithkubernetes.com   2021-11-23T16:17:01Z
```
