#!/usr/bin/env bash

echo "Building service..."
cd project-service
docker build . -t robsondepaula/project-service
echo "Upload service container image..."
docker push robsondepaula/project-service
cd ..

echo "Building app..."
cd project
docker build . -t robsondepaula/project
echo "Upload app container image..."
docker push robsondepaula/project
cd ..