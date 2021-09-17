# Install client side 'sealed-secrets'
```
brew install kubeseal
```
# Install SealedSecret CRD, server-side controller into kube-system namespace
```
kubectl apply -f https://github.com/bitnami-labs/sealed-secrets/releases/download/v0.16.0/controller.yaml
```