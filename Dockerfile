FROM node:latest

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

ARG NESTJS_PORT=3200
ENV NESTJS_PORT=$NESTJS_PORT
EXPOSE $NESTJS_PORT
CMD [ "npm", "run", "start" ]