import express from "express";
import { Server } from "http";
import baseController from "./controller/baseController";
import logger from "./middleware/logger";

class App {
  public app: express.Application;

  constructor(controllers: baseController[], middlewares: any[]) {
    const app = express();

    this.app = app;
    this.registerMiddlewares(middlewares);
    this.registerControllers(controllers);
  }

  public listen(port: number): Server {
    return this.app.listen(port, () => {
      logger.info(`Server Running on ${port}`);
    });
  }

  private registerControllers(controllers: baseController[]): void {
    this.app.get("/", (req, res) => res.status(200).send("Hello"));
    controllers.forEach(controller =>
      this.app.use(controller.url, controller.router)
    );
  }

  private registerMiddlewares(middlewares: any[]): void {
    middlewares.forEach(middleware => this.app.use(middleware));
  }
}

export default App;
