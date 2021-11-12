# Install SOPS
Download the binary release from https://github.com/mozilla/sops/releases, chmod it and move it to /usr/local/bin, for instance.

# Install age
```
brew install age
```

# Usage
1. Have the *Secret* resource manifest available with the data that needs to be ciphered before version control.

2. Create an *age* key pair which cannot be version controlled and only distributed to select team members by secure ways.
```
age-keygen -o key.txt
```

3. Use *sops* to encrypt the *Secret* resource, the resulting file can finally be version controlled.
```
sops --encrypt \
       --age <AGE-PUBLIC-KEY> \
       secret.yaml > secret.enc.yaml
```

4. In case a team member need the *Secret* resource only having the encrypted version and having the key pair, the decryption can occur like so:
```
export SOPS_AGE_KEY_FILE=$(pwd)/key.txt
sops --decrypt secret.enc.yaml > secret.yaml
```

