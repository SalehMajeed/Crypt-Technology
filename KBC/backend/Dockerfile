FROM node:18-alpine AS nodejs

RUN apk add --no-cache curl bash
RUN npm install -g pm2

WORKDIR /usr/docker-container/kbc/backend

COPY ./package.json ./

RUN npm install

COPY ./ ./

CMD ["pm2-runtime", "server.js", "--watch", "--json", "--silent"]