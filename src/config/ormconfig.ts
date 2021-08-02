import { ConnectionOptions } from "typeorm";

import { DB, DB_CONFIG } from "./dbcconfig";

export const connectionOptions = (db: DB): ConnectionOptions => {
  return {
    type: "mysql",
    host: DB_CONFIG.DB_HOST,
    port: DB_CONFIG.DB_PORT,
    username: DB_CONFIG.DB_USERNAME,
    password: DB_CONFIG.DB_PASSWORD,
    database: db === DB.DEV ? DB_CONFIG.MAINDB_NAME : DB_CONFIG.TESTDB_NAME,
    synchronize: true,
    logging: false,
    entities: ["src/entity/**/*.ts"],
    migrations: ["src/migration/**/*.ts"],
    subscribers: ["src/subscriber/**/*.ts"],
    cli: {
      entitiesDir: "src/entity",
      migrationsDir: "src/migration",
      subscribersDir: "src/subscriber"
    }
  };
};
