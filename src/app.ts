import express from "express";
import { Logger } from "winston";
import logger from "./middleware/logger";
import { ServerOptions } from "./types/types";

class App {
  public app: express.Application;
  public logger?: Logger;

  constructor(serverOptions: ServerOptions) {
    this.app = express();
    this.router();
    this.logger = logger({ status: serverOptions.status });
  }

  private router(): void {
    this.app.get("/", (req: express.Request, res: express.Response) => {
      res.status(200).json({ body: "Hello" });
    });
  }
}

export default App;
