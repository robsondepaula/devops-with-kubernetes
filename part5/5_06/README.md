# Landscape

The base image was retrieved from [CNCF](https://landscape.cncf.io/images/landscape.png) on 30-November-2021.

It was modified to blur what I didn't use (yet). Circles were added in <span style="color:red">*red*</span> color to highlight every product/project that was used knowingly on this course or outside it. In <span style="color:green">*green*</span> the products/projects that are used as a dependency.

The image is 8520x5025 so please open it on a separate tab and pan and zoom through it.

![landscape](./landscape_circled.png)

The following list provides additional information, per CNCF category:
* Database
    - Hadoop: used knowingly outside of this course
    - mongoDB: used knowingly outside of this course
    - MySQL: used knowingly outside of this course
    - PostreSQL: used knowingly both outside and in this course
    - redis: used knowingly both outside and in this course
* Streaming & Messaging
    - NATS: used knowingly in this course
    - Apache Spark: used knowingly outside of this course
    - RabbitMQ: used knowingly outside of this course
* Application Definition & Image Build
    - HELM: used knowingly in this course
    - Gradle: used knowingly outside of this course
* Continuous Integration & Delivery
    - argo: used knowingly in this course
    - flux: used knowingly in this course
    - CircleCI: used knowingly outside of this course
    - Github Actions: used knowingly both outside and in this course
    - Gitlab: used knowingly outside of this course
    - Jenkins: used knowingly outside of this course
* Platform
    - k3s: used as dependency in this course. It is a requirement for k3d.
* Serverless
    - knative: used knowingly in this course
* Scheduling & Orchestration
    - kubernetes: used knowingly in this course
* Coordination & Service Discovery
    - CoreDNS: used as dependency in this course. It is part of kubernetes installed by k3s.
    - etcd: used as dependency in this course. It is part of kubernetes installed by k3s.
* Service Proxy
    - Contour: used knowingly in this course
    - NGINX: used knowingly in this course
    - Traefik Proxy: used as dependency in this course. It is part of kubernetes installed by k3s.
* Service Mesh
    - linkerd: used knowingly in this course
* Certified Kubernetes Hosted
    - Google Kubernetes Engine: used knowingly in this course
* Cloud Native Storage
    - Arrikto: used knowingly outside of this course. It was part of the Kubeflow on minikube tutorial.
* Container Runtime
    - Firecracker: used as dependency outside of this course. It powers AWS Lambda (FaaS).
* Cloud Native Network
    - CNI: used as dependency outside of this course. It was installed when using minikube.
    - Project Calico: used as dependency outside of this course. It was installed when using minikube.
* Certified Kubernetes Installer
    - Google Cloud: used knowingly in this course
    - minikube: used knowingly outside of this course
* PaaS/Container as Service
    - Heroku: used knowingly outside of this course
* Automation & Configuration
    - AWS CloudFormation: used knowingly outside of this course
    - Hashicorp Terraform: used knowingly outside of this course
* Container Registry
    - Google Container Registry: used knowingly in this course
* Observability and Analysis
    - Prometheus: used knowingly in this course
    - Google Stackdriver: used knowingly in this course
    - Grafana: used knowingly in this course
* Logging
    - Grafana Loki: used knowingly in this course