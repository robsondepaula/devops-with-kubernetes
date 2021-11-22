# Secrets management using SOPS

Notice that you should encrypt only the data section, encrypting the Kubernetes secret metadata, kind or apiVersion is not supported by kustomize-controller:
```
sops --age=<age-key> \
--encrypt --encrypted-regex '^(data|stringData)$' secret.yaml > secret.enc.yaml
```
