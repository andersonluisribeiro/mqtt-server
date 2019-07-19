FROM node:8.14.0-alpine

RUN apk add --no-cache git python make bash gcc g++ zeromq-dev musl-dev zlib-dev krb5-dev

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 1883

CMD [ "node", "--max-old-space-size=7000", "index.js" ]