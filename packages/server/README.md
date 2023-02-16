### server

This is a `fastify` with `trpc` api which is a package that is being used by the package `mobile`

### Installation

To install this package on the mobile you navigate to the `packages/mobile` and run the following command:

```shell
yarn add @askme/server:1.0.0
```

### Environmental Variables

The `.env` file is required to start the server and should have the following `environmental` variables:

```.env
# Twilio

TWILIO_ACCOUNT_SID=<YOUR_ACCOUNT_SID>
TWILIO_AUTH_TOKEN=<YOUR_AUTH_TOKEN>
TRIAL_PHONE_NUMBER  = <YOUR_ACCOUNT_TRIAL_PHONE_NUMBER>

# environment
NODE_ENV = "development" # production

# JWT

JWT_SECRETE = secrete



# Database (POSTGRES)
DATABASE_USER = admin
DATABASE_PASSWORD = password
DATABASE_HOST = host.docker.internal
DATABASE_NAME = askme
DATABASE_PORT = 5432

# Cache (REDIS)
REDIS_HOST = host.docker.internal

# Server
PORT=3001

```

> Note that you will need to get [`twilio`](https://www.twilio.com/) credentials that allows you to send sms to the users. Also not that you can also change these environmental variables.
