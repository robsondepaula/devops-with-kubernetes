#!/usr/bin/env bash

echo "Building service..."
cd project-service
docker build . -t robsondepaula/project-service:2_02
echo "Upload service container image..."
docker push robsondepaula/project-service:2_02
cd ..

echo "Building app..."
cd project
docker build . -t robsondepaula/project:2_02
echo "Upload app container image..."
docker push robsondepaula/project:2_02
cd ..