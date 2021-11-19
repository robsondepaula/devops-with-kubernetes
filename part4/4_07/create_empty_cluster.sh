#!/usr/bin/env bash

echo "Create local folder for volume binding..."
mkdir -p /tmp/kube
echo "Create a cluster (1 master, 2 worker) without the traefik ingress and with the volume binding indication..."
k3d cluster create --k3s-arg '--disable=traefik@server:0' --volume /tmp/kube:/tmp/kube -p 8081:80@loadbalancer --agents 2
echo "Conclude the volume binding..."
docker exec k3d-k3s-default-agent-0 mkdir -p /tmp/kube
echo "Done!"