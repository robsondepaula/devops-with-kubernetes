# kubebuilder project
The project was initialized with:
```
kubebuilder init --domain devopswithkubernetes.com --repo github.com/robsondepaula/devops-with-kubernetes/part5/5_01/controller
```
The API was created with:
```
kubebuilder create api --group stable --version v1 --kind DummySite
```

# Workflow
To work on the controller source code or to validate it, issue the following command (provided a cluster exists):
```
make install
```
To have the custom resource applied to the cluster and test that it works issue the following command:
```
make run
```
And then deploy the manifest containing the custom resource to validate all is working:
```
kubectl apply -f config/samples/stable_v1_dummysite.yaml
```