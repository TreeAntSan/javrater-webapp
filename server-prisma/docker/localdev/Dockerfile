# base image
FROM node:9.11.1

# set working directory
RUN mkdir -p /app
WORKDIR /app

# To solve a little problem https://github.com/archiverjs/node-archiver/issues/315#issuecomment-377160152
#RUN npm install readable-stream --no-save

# install modules
COPY ./package.json ./package.json
RUN yarn install

# install graphql to allow playground
RUN yarn global add graphql

# copy files to work directory
COPY . .

# start the playground (port 3000) and the server (port 4000)
#RUN [ "yarn", "playground" ]
#CMD [ "yarn", "start" ]

# Leave as this until I fix prisma server contact
CMD [ "node", "-r", "dotenv/config", "src/index.js" ]

EXPOSE 3000 4000
