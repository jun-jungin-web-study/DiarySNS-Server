import dotenv from "dotenv";

dotenv.config();

export const ENV_CONFIG = {
  DB_HOST: process.env.DB_HOST ?? "localhost",
  DB_PORT: Number(process.env.DB_PORT) ?? 3306,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  MAINDB_NAME: process.env.MAINDB_NAME,
  TESTDB_NAME: process.env.TESTDB_NAME,
  PORT: Number(process.env.SERVER_PORT),
  env: process.env.NODE_ENV,
  SECRET: process.env.SECRET ?? "secret",
  REFRESH_TOKEN_EXPIRE: process.env.REFRESH_TOKEN_EXPIRE ?? "30s",
  ACCESS_TOKEN_EXPIRE: process.env.ACCESS_TOKEN_EXPIRE ?? "60s"
};
