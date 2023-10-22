# FROM ubuntu:22.04
FROM node:18

WORKDIR /server

COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 1338

CMD [ "node", "server.js" ]