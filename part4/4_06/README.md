# Local Kubernetes using k3d
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
kubectl apply -f dependencies/nginx-class.yaml
```

## Monitoring
If not already done, follow the setup instructions on [4_03](../4_03/README.md).

## Messaging
Add the helm chart for NATS (if not done previously):
```
helm repo add nats https://nats-io.github.io/k8s/helm/charts/
helm repo update
```
Deploy NATS:
```
helm install my-nats nats/nats
```

## Service monitoring setup
Obtain the label to be used on the ServiceMonitor CRD:
```
kubectl -n prometheus get prometheus | grep kube-prometheus | awk '{print $1}' | read svc; kubectl describe prometheus -n prometheus $svc
```
Double check the Port name:
```
kubectl describe svc my-nats
```
Update the label on the manifest and then deploy the service monitor:
```
kubectl apply -f manifests/nats-service-monitor.yaml
```
Check it is available:
```
kubectl get servicemonitors -A
```
Find the Prometheus Operator pod and port forward to it:
```
kubectl get po -n prometheus | grep prometheus-kube-prometheus-stack | awk '{print $1}' | read operator; kubectl -n prometheus port-forward $operator 9090:9090
```
Port forward to Graphana:
```
kubectl get po -n prometheus | grep grafana | awk '{print $1}' | read grafana; kubectl -n prometheus port-forward $grafana 3000
```
Import the customized [json](./prometheus-graphana-exporter/import.json).

## Step-by-step deployment
1. Create the namespace
```
kubectl apply -f dependencies/namespace.yaml
```
2. Add the helm chart (if not yet):
```
helm repo add sealed-secrets https://bitnami-labs.github.io/sealed-secrets
```
And install SealedSecret CRD, server-side controller into kube-system namespace:
```
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

3. Verify frontend, backend and messaging is working properly by creating and updating a "TODO" and checking the https://discord.gg/DVJjdSTU channel.