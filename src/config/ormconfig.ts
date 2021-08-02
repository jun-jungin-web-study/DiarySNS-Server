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
    entities: ["src/db/entity/**/*.ts"],
    migrations: ["src/db/migration/**/*.ts"],
    subscribers: ["src/db/subscriber/**/*.ts"],
    cli: {
      entitiesDir: "src/db/entity",
      migrationsDir: "src/db/migration",
      subscribersDir: "src/db/subscriber"
    }
  };
};
