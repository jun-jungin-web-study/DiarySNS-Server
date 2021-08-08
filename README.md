# DiarySNS-Server

## About

This is repository for api server of **DiarySNS**.
We use `Typescript`, `TypeORM`, `mysql`.

- <a href=https://github.com/jun-jungin-web-study/DiarySNS-Client> Frontend Repository </a>

- <a href=https://github.com/jun-jungin-web-study/DiarySNS-Server/tree/main/src/controller#diarysns-api-specifications>Api documentation </a>

## How to Run Server

1. Install Docker from https://docs.docker.com/get-docker/
2. Pull images from docker hub.

   ```
   docker pull node
   docker pull mysql
   ```

3. Configure `.env` file with below format.

   ```
   DB_HOST=typeorm-mysql
   DB_PORT=3306
   DB_USERNAME=[username]
   DB_ROOT_PASSWORD=[rootpassword]
   DB_PASSWORD=[password]
   MAINDB_NAME=[db for development]
   TESTDB_NAME=[db for test]

   SERVER_PORT=5000

   SECRET=[jwt secret ket]

   REFRESH_TOKEN_EXPIRE=[refresh token expiration time]
   ACCESS_TOKEN_EXPIRE=[access token expiration time]
   ```

4. Run Server by typing below command to your shell. (If you don't have `Makefile`, please install it)

   ```
   make up
   ```

   (Currently the this repo is under development, so the server executed with `nodemon` in development environment.)

5. You can stop the server by writing below command
   ```
   make down
   ```
