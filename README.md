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

3. Create `.env` file with below format on root directory.

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

   After this, the api server will run at `localhost:5000`, and mysql database will run at `localhost:3306`.

   To check the server is running well, open send `GET http://localhost:5000/`. If it returns `"hello"`, the server is successfully running on your local machine.

5. You can stop the server by writing below command
   ```
   make down
   ```
6. You can clean all server related images and volumes with below command
   ```
   make clean
   ```
7. You can run tests implemented in the server with below command.
   ```
   make test
   ```
   \*\*\* Currently this works only if there is no images or volumes related to server. This will be fixed.
