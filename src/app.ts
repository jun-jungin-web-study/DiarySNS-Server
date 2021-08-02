import express from "express";
import { Connection } from "typeorm";
import baseRouter from "./routes/routes";

class App {
  public app: express.Application;
  private connection?: Connection;

  constructor(connection: Connection) {
    const app = express();
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    this.app = app;
    this.router();
    this.connection = connection;
  }

  private router(): void {
    this.app.use("/", baseRouter);
  }
}

export default App;
