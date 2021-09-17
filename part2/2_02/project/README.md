# The "project"
To run the app locally:
```
npm start
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser. Requires that the service is also running on port 3001.

To build it for deployment and containerization:
```
npm run build
```
Outputs to the `build` folder.
# Building the image
```
docker build . -t robsondepaula/project:2_02
```
# Publish to Docker Hub
```
docker push robsondepaula/project:2_02
```