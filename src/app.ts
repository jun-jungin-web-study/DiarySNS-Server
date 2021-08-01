import express from "express";
import { Logger } from "winston";

class App {
  public application: express.Application;
  public logger?: Logger;

  constructor(logger?: Logger) {
    this.application = express();
    this.router();
    this.logger = logger;
  }

  public run(): void {
    this.application.listen(3000, () => {
      this.logger?.info("Server Running on 3000");
    });
  }

  private router(): void {
    this.application.get("/", (req: express.Request, res: express.Response) => {
      res.send("hello!");
    });
  }
}

export default App;
