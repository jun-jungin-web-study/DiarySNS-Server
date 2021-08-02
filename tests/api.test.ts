import App from "../src/app";
import request from "supertest";
import { connectionOptions } from "../src/config/ormconfig";
import { DB } from "../src/config/dbcconfig";
import { createConnection, Connection } from "typeorm";
import logger from "../src/middleware/logger";
import { SERVER_CONFIG } from "../src/config/serverconfig";
import { Server } from "http";
import express from "express";

const PORT = SERVER_CONFIG.SERVER_PORT;

let app: express.Application;
let server: Server;
let connection: Connection;

describe("Test base url", () => {
  beforeAll(async () => {
    connection = await createConnection(connectionOptions(DB.TEST));
    app = new App(connection).app;
    server = app.listen(PORT, () => {
      logger.info(`Test Server Running on ${PORT}`);
    });
  });

  afterAll(() => {
    server.close();
    connection.close();
  });

  it.only("GET '/'", async () => {
    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);
  });

  // it("GET /api/login", async () => {
  //   const response = await request(app.app).get("/api/login");

  //   expect(response.statusCode).toBe(200);
  // });

  // it("POST /api/login", async () => {
  //   const login = {
  //     id: "abcd",
  //     pw: "12341234"
  //   };

  //   const response = await request(app.app).post("/api/login").send(login);

  //   expect(response.statusCode).toBe(200);
  // });
});
