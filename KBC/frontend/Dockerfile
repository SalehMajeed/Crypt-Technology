FROM node:18-alpine

WORKDIR /usr/docker-container/kbc/frontend

COPY ./package.json ./

RUN npm install

COPY ./ ./

CMD ["npm", "start"]