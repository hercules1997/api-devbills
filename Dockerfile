FROM node:18-alpine

WORKDIR /home/App

COPY . ./

RUN npm i 

EXPOSE 3333

CMD [ "npm", "run", "dev"]