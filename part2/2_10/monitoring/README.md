# Infra for monitoring
If on a new cluster:
```
kubectl create namespace prometheus
```
And then:
```
helm install prometheus-community/kube-prometheus-stack --generate-name --namespace prometheus
```
## Expose Grafana
Find the Grafana pod and port forward to it:
```
kubectl get po -n prometheus | grep grafana | awk '{print $1}' | read grafana; kubectl -n prometheus port-forward $grafana 3000
```
Access http://localhost:3000 and use:
```
admin
```
```
prom-operator
```
## Add Loki
```
kubectl create namespace loki-stack
```
```
helm upgrade --install loki --namespace=loki-stack loki/loki-stack
```
Open Grafana and go to settings and "Add data source":
```
http://loki.loki-stack:3100
```
# Explore the logs
Click on the Explore tab and choose Loki as data source, pick the desired Log label (for instance {app="project-svc"}).