import express from "express";
import { Logger } from "winston";
import logger from "./middleware/logger";
import baseRouter from "./routes/routes";
import { ServerOptions } from "./types/types";

class App {
  public app: express.Application;
  public logger?: Logger;

  constructor(serverOptions: ServerOptions) {
    const app = express();
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    this.app = app;
    this.router();
    this.logger = logger({ status: serverOptions.status });
  }

  private router(): void {
    this.app.use("/", baseRouter);
  }
}

export default App;
