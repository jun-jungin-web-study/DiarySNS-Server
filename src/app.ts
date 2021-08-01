import express from "express";
import { Connection, createConnection, ConnectionOptions } from "typeorm";
import { Logger } from "winston";
import { connectionOptions } from "./config/ormconfig";
import logger from "./middleware/logger";
import baseRouter from "./routes/routes";
import { ServerOptions } from "./types/types";

class App {
  public app: express.Application;
  public logger?: Logger;
  public connection?: Connection;

  constructor(serverOptions: ServerOptions, connection: Connection) {
    const app = express();
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    this.app = app;
    this.router();
    this.logger = logger({ status: serverOptions.status });
    this.connection = connection;
  }

  private router(): void {
    this.app.use("/", baseRouter);
  }
}

export default App;
