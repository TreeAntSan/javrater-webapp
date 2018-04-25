# base image
FROM node:9.11.1

# set working directory
RUN mkdir -p /app
WORKDIR /app

# install modules
COPY ./package.json ./package.json
RUN yarn install
RUN yarn global add serve

# copy files to work directory
COPY . .

# build the client
RUN yarn build
#RUN rm -rf ./src

# start the client
CMD [ "serve", "-s", "build", "-p", "3000" ]

EXPOSE 3000
