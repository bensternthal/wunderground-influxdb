FROM node:6.4

ADD ./ /node_app

WORKDIR /node_app

RUN npm install
