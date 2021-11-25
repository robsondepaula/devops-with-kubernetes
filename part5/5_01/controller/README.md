# kubebuilder project
Initialized with:
```
kubebuilder init --domain devopswithkubernetes.com --repo github.com/robs
ondepaula/devops-with-kubernetes/part5/5_01/controller
```
API created with:
```
kubebuilder create api --group stable --version v1 --kind DummySite
```

# Workflow
Work on the controller source code and then:
```
make install
```
To have the custom resource applied to the cluster. To test the controller issue:
```
make run
```
And then deploy the manifest to validate it works:
```
kubectl apply -f config/samples/stable_v1_dummysite.yaml
```
