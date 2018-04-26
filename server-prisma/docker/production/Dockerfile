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

# start the server (port 4000)
#CMD [ "yarn", "start" ]
# Leave as this until I fix prisma server contact
CMD [ "node", "-r", "dotenv/config", "src/index.js" ]

EXPOSE 4000
