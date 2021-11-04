# Infra for monitoring
If on a new cluster:
```
kubectl create namespace prometheus
```
And then:
```
helm install prometheus-community/kube-prometheus-stack --generate-name --namespace prometheus
```
Find the Prometheus Operator pod and port forward to it:
```
kubectl get po -n prometheus | grep prometheus-kube-prometheus-stack | awk '{print $1}' | read operator; kubectl -n prometheus port-forward $operator 9090:9090
```
Access http://localhost:9090 and perform the necessary queries.

## Query for number of pods created by StatefulSets in "prometheus" namespace
```
count(count by (uid) (kube_pod_info{namespace="prometheus", created_by_kind="StatefulSet"}))
```

## Expose Grafana (optional for this exercise)
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
## Add Loki (optional for this exercise)
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