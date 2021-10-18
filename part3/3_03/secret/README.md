# Sealing a secret
The unsealed secret must not be version controlled (for obvious reasons).

The proper namespace must be already defined in the cluster and its value referenced on the secret.yaml otherwise the key will fail to unseal.

The following command takes care of generating a sealed version:
```
kubeseal -o yaml <secret.yaml> sealedsecret.yaml
```
Apply it so that it becomes available for usage in the cluster:
```
kubectl apply -f sealedsecret.yaml
```
Check it is available:
```
kubectl get secrets
```