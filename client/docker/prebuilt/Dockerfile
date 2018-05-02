# base image
FROM node:9.11.1

# set working directory
RUN mkdir -p /app
WORKDIR /app

# install serve tool
RUN yarn global add serve

# copy files to work directory
COPY ./build ./build

# start the client
CMD [ "serve", "--single", "--port=80", "./build" ]

EXPOSE 80
