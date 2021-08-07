import express, { NextFunction, Request, Response } from "express";
import { Server } from "http";
import passport from "passport";
import baseController from "./controller/baseController";
import logger from "./middleware/logger";

import "./service/auth/passport/jwt";

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

    controllers.forEach(controller => {
      this.app.use(controller.url, controller.router);
    });

    this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      res.status(442).json({ error: { message: err } });
    });
  }

  private registerMiddlewares(middlewares: any[]): void {
    middlewares.forEach(middleware => this.app.use(middleware));
  }
}

export default App;
