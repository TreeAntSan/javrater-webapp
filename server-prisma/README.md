## dotenv

There is a secret file that is not in this repo. .env
(located at `./server-prisma/.env`)

This file is used by the module [`dotenv`](https://github.com/motdotla/dotenv), by docker-compose, and by prisma-cli.

You *need to create this file* before things can run. You can even copy the example I have below if you want.

This file has a few things that need to be kept secret and a few things that aren't really that secret:
```
PRISMA_STAGE="dev"
PRISMA_ENDPOINT="http://self:4466/server-prisma/dev"
PRISMA_CLUSTER="local"
PRISMA_SECRET="SOME_PRISMA_SECRET"
APP_SECRET="SOME_APP_SECRET"
PRISMA_MANAGEMENT_API_SECRET="SOME_PRISMA_MANAGEMENT_API_SECRET"
```

The first three lines pertain to simple Prisma server settings. You start the Prisma server by using the command `prisma deploy` if you're installed the prisma module globally, otherwise `yarn prisma deploy`/`npm run prisma deploy` should work. Also, if you run into issues `prisma local stop` and `prisma local stop` tend to help.

The next three variables are secret keys that you should set to random strings of characters and digits and symbols. I used random [`UUID4`](https://www.uuidgenerator.net/)s for mine.

`PRISMA_SECRET` is the secret key for the Prisma server (a local Docker container). If you change this secret you'll need to re-deploy the Prisma server. From there you can use `prisma token` to grab a new token if needed. This token is used when using the Playground when you add to the HTTP header like this:
```
{
  "Authorization" : "Bearer <TOKEN>"
}
```

`APP_SECRET` is used by the login system for the server. It is used as the secret key to the [`JWT token`](https://jwt.io/) signing process in `src/utils.js`. If you change this secret all users will have to log in again.

`PRISMA_MANAGEMENT_API_SECRET` is used in Prisma 1.7 and newer as a simpler way to provide security between prisma-cli and Prisma endpoint (before it was an ugly SSH key pair). You need to define the same secret into your `~/.prisma/config.yml` file like this:
```
clusters:
  local:
    host: 'http://localhost:4466'
    clusterSecret: "SOME_PRISMA_MANAGEMENT_API_SECRET"
```
The secret is grabbed as an environment variable when the docker-compose.yml for the Prisma server is launched. Look in `./database/docker-compose.yml` for `SOME_PRISMA_MANAGEMENT_API_SECRET` and it'll make sense.

That way, when you `prisma deploy`, prisma-cli will know the secret to access your endpoint. You can even define different `.env` files, like `.env.aws` and you can make your prisma-cli deploy to an AWS instance or something (the `PRISMA_ENDPOINT` variable being the difference) with `prisma deploy -e ./.env.aws`.

Combine that with [docker-machine stuff](https://docs.docker.com/machine/drivers/aws/) (like [this guy did here](http://www.prisma.io/forum/t/deployment-of-prisma-to-aws-ec2/2880)) and viola! You're be running this thing on AWS in no-time!
