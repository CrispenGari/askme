### prisma

`prisma` expect us to have a `.env` file in the root folder of our project, and in that `.env` file we are going to have something that looks as follows

```shell

# when connecting with docker
DATABASE_URL="postgresql://admin:password@host.docker.internal:5432/askme?schema=public"

# when connecting locally
# DATABASE_URL="postgresql://postgres:root@localhost:5432/askme?schema=public"

```

When you have the environmental variables you can go ahead and run migrations by running the following command:

```shell
npx prisma migrate dev --name init
```

> Make sure that you have the instance of `postgres` running on your computer.
