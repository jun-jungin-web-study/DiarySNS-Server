import express from "express";
import { Connection } from "typeorm";
import baseController from "./controller/baseController";

class App {
  public app: express.Application;
  private connection: Connection;

  constructor(
    connection: Connection,
    controllers: baseController[],
    middlewares: any[]
  ) {
    const app = express();

    this.app = app;
    this.registerMiddlewares(middlewares);
    this.registerControllers(controllers);
    this.connection = connection;
  }

  private registerControllers(controllers: baseController[]): void {
    controllers.forEach(controller =>
      this.app.use(controller.url, controller.router)
    );
  }

  private registerMiddlewares(middlewares: any[]): void {
    middlewares.forEach(middleware => this.app.use(middleware));
  }
}

export default App;
