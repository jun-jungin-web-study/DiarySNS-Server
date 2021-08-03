import request from "supertest";
import { bootstrap } from "../src";
import { ENV_CONFIG } from "../src/config/envconfig";
import App from "../src/app";
import logger from "../src/middleware/logger";
import { Connection } from "typeorm";
import { Server } from "http";
import dbConnection from "../src/db/db";

describe("Test base url", () => {
  let app: App;
  let server: Server;
  let db: Connection;

  beforeAll(async () => {
    try {
      await bootstrap().then(application => {
        app = application;
      });
      db = await dbConnection;
      server = app.listen(ENV_CONFIG.PORT);
    } catch (e) {
      console.log(e);
    }
  });

  afterAll(async () => {
    server.close();
    await db.close();
  });

  it("GET '/'", async () => {
    const response = await request(app.app).get("/");

    expect(response.statusCode).toBe(200);
  });

  // it("GET /api/login", async () => {
  //   const response = await request(app).get("/api/login");

  //   expect(response.statusCode).toBe(200);
  // });

  // it("POST /api/login", async () => {
  //   const login = {
  //     id: "abcd",
  //     pw: "12341234"
  //   };

  //   const response = await request(app).post("/api/login").send(login);

  //   expect(response.statusCode).toBe(200);
  // });
});
