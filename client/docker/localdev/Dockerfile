# base image
FROM node:9.11.1

# set a particular port for the client
ENV PORT 3005

# set working directory
RUN mkdir -p /app
WORKDIR /app

# install modules
COPY ./package.json ./package.json
RUN npm install
RUN npm install -g serve

# copy files to work directory
COPY . .

# start the client
CMD [ "npm", "start" ]

EXPOSE $PORT
