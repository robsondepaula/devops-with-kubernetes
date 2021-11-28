# dummy-site
This is a web scrapper which creates a copy of a given website.

The objective here is to validate the custom resource definition, DummySite, created to illustrate how to extend Kubernetes.

It makes use of the [goclone](https://github.com/imthaghost/goclone) package to speed up the results.

Since the original *goclone* did not provide a 'no-gui' option I made a fork and performed the necessary changes so that it can not only clone the website but also serve it on a local port on a 'headless' container. Pleache check the [fork](https://github.com/robsondepaula/goclone) for details.

The cloned dummy site is served by port 5000 and health check endpoints for kubernetes are available at 8080.

## Local testing
Execute:
```
GOPATH=~/go WEBSITE_URL=https://example.com/ bash -c 'go run .'
```
Health check:
```
curl localhost:8080/healthz
```

## Docker image
To build:
```
docker build . -t robsondepaula/dummy-site:5_01
```
To publish:
```
docker push robsondepaula/dummy-site:5_01
```

### Simple Dockerfile debugging
```
DOCKER_BUILDKIT=0 docker build . -t robsondepaula/dummy-site:5_01
```
