# Sealing a secret
The unsealed secret must not be version controlled (for obvious reasons).

The proper namespace must be already defined in the cluster and its value referenced on the secret.yaml otherwise the key will fail to unseal.