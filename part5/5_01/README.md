# DIY CRD & Controller

## Cluster setup
The tests are performed on a 'simple' cluster created like so:
```
k3d cluster create --agents 2
```

## Custom Resource Definition
The CRD was created using kubebuilder and the details can be found in the [controller](./controller) subfolder.

## DummySite
The deployment created by the CRD controller uses a Docker image built to clone the website. It contains a service written in the Go language that servers k8s health-check endpoints, clones the website and serve it.  Details on how this image was obtained can be found in the [dummy-site](./dummy-site) subfolder.

# Validation
To validate the end-to-end requirement (deploy a CRD and check it clones a website), make sure you navigate to [controller](./controller) and follow the instructions there.

In case you do not have *kubebuilder* installed you can validate the CRD assignment by issuing the following command:
```
kubectl apply -k manifests/
```

And once the resources are available, deploy the *DummySite*:
```
kubectl apply -f manifests/stable_v1_dummysite.yaml
```

## Screenshots
The image below shows the pod running the *dummy-site* image using [Lens](https://k8slens.dev/). The pod was created by the *controller* CRD.

![files](./5_01_1.png)

Notice the https://example.com/ was downloaded successfully per the assignment instructions.

You can visit the cloned dummy site by port forwarding to 5000 on the Pod, use *kubectl* or *Lens* itself to do so, and check the results as illustrated on the screenshot below.

![site](./5_01_2.png)