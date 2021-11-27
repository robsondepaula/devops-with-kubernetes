# dummy-site
This is a web scrapper which creates a copy of a given website.

The objective here is to validate the custom resource definition, DummySite, created to illustrate how to extend Kubernetes.

It makes use of the [goclone](https://github.com/imthaghost/goclone) package to speed up the results.

## Local testing
Execute:
```
GOPATH=~/go WEBSITE_URL=https://example.com/ bash -c 'go run .'
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
