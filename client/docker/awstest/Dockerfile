# base image
FROM node:9.11.1

# set working directory
RUN mkdir -p /app
WORKDIR /app

# install modules
COPY ./package.json ./package.json
RUN yarn install

# do something
CMD [ "sleep", "99999999" ]

EXPOSE 3000
