FROM node:15

WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y wait-for-it

COPY . .

RUN npm install

EXPOSE 3000
