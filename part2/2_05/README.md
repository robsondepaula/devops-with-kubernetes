# Install client side 'sealed-secrets'
```
brew install kubeseal
```
# Install SealedSecret CRD, server-side controller into kube-system namespace
```
kubectl apply -f https://github.com/bitnami-labs/sealed-secrets/releases/download/v0.16.0/controller.yaml
```
For a more up-to-date version and finer grained setup, prefer the helm installation method below:
1. Add the helm chart (if not yet):
```
helm repo add sealed-secrets https://bitnami-labs.github.io/sealed-secrets
helm repo update
```
2. Install SealedSecret CRD, server-side controller into kube-system namespace:
```
helm install sealed-secrets --namespace kube-system --version 1.16.1 sealed-secrets/sealed-secrets
```