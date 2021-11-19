# Cluster setup
The "empty" cluster must exist before using flux to bootstrap it the GitOps way.

So the pre conditions should at least be the following:
1. Create the local directory (if not exist):
```
mkdir -p /tmp/kube
```
2. Command used to create the cluster:
```
k3d cluster create --k3s-arg "--disable=traefik@server:0" --volume /tmp/kube:/tmp/kube -p 8081:80@loadbalancer --agents 2
```
3. Create the local volume binding:
```
docker exec k3d-k3s-default-agent-0 mkdir -p /tmp/kube
```
Remaining setup of the infrasctructure is going to occur declaratively.

*Or* you can use the convenience script [create_empty_cluster.sh](./create_empty_cluster.sh).

## GitOps
Install flux (if not yet):

Bootstrap a repo to sync the cluster:
```
flux bootstrap github \
    --owner=robsondepaula \
    --repository=kube-cluster-dwk \
    --personal \
    --private=false
```
### Check https://github.com/robsondepaula/kube-cluster-dwk for details.

## Testing
Monitor flux in action:
```
watch flux get kustomizations
```

When the reconciliation is done, the cluster will not be "empty" anymore and contain:
* nginx
* nats
* prometheus
* loki
* promtail
* sealed-secrets

What can be double checked using Lens or kubectl.

## Tips
To access prometheus:
```
kubectl get po -n prometheus | grep prometheus-prometheus-kube-prometheus-prometheus | awk '{print $1}' | read operator; kubectl -n prometheus port-forward $operator 9090:9090
```
To access graphana:
```
kubectl get po -n prometheus | grep grafana | awk '{print $1}' | read grafana; kubectl -n prometheus port-forward $grafana 3000
```

# Application deployment
1. Seal and apply the app secrets:
```
kubeseal --controller-namespace kube-system \
    --controller-name sealed-secrets-controller \
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
2. Deploy the dependencies with kustomize:
```
kubectl apply -k dependencies/.
```

3. Make sure the dependencies are ready (use Lens or kubectl) and only then deploy the project:
```
kubectl apply -k manifests/.
```

4. Monitor the deployment state:
```
watch -n 1 "kubectl get po -n=project-namespace"
```

5. Verify frontend, backend and messaging is working properly by creating and updating a "TODO" in http://localhost:8081 and checking the https://discord.gg/DVJjdSTU channel.