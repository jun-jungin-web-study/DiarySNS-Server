import dotenv from "dotenv";

dotenv.config();

export const DB_CONFIG = {
  DB_HOST: process.env.DB_HOST ?? "localhost",
  DB_PORT: Number(process.env.DB_PORT) ?? 3306,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  MAINDB_NAME: process.env.MAINDB_NAME,
  TESTDB_NAME: process.env.TESTDB_NAME
};

export enum DB {
  TEST,
  DEV
}
