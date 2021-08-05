import { createConnection, ConnectionOptions } from "typeorm";

import { ENV_CONFIG } from "../config/envconfig";

export const connectionOptions: ConnectionOptions = {
  type: "mysql",
  host: ENV_CONFIG.DB_HOST,
  port: ENV_CONFIG.DB_PORT,
  username: ENV_CONFIG.DB_USERNAME,
  password: ENV_CONFIG.DB_PASSWORD,
  database:
    ENV_CONFIG.env !== "test" ? ENV_CONFIG.MAINDB_NAME : ENV_CONFIG.TESTDB_NAME,
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

const dbConnection = createConnection(connectionOptions);

export default dbConnection;
