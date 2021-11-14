FROM node:14.17.3 as build
RUN mkdir /app
COPY . /app
WORKDIR /app
RUN npm install \
    && npm run-script build \
    && ls -l

FROM nginx:1.21.3-alpine
COPY --from=build /app/build/ /usr/share/nginx/html