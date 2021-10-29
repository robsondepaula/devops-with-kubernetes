FROM node:14-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

# network debugging
RUN apk add --update \
    curl \
    && rm -rf /var/cache/apk/*

WORKDIR /home/node/app

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

CMD [ "node", "index.js" ]