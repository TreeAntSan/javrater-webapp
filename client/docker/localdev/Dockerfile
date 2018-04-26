# base image
FROM node:9.11.1

# set working directory
RUN mkdir -p /app
WORKDIR /app

# install modules
COPY ./package.json ./package.json
RUN yarn install

# copy files to work directory
COPY . .

# start the client
CMD [ "yarn", "start" ]

EXPOSE 3000
