# The "project"
Run the app locally:
```
npm start
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

To build it for deployment and containerization:
```
npm run build
```
Outputs to the `build` folder.
# Building the image
```
docker build . -t robsondepaula/project:1_12
```
# Publish to Docker Hub
```
docker push robsondepaula/project:1_12
```