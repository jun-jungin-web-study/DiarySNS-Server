import request from "supertest";
import { bootstrap } from "../src";
import { ENV_CONFIG } from "../src/config/envconfig";
import App from "../src/app";
import logger from "../src/middleware/logger";
import { Connection } from "typeorm";
import { Server } from "http";
import dbConnection from "../src/db/db";

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
    logger.error(`Test bootstrapping failed: ${e}`);
  }
});

afterAll(async () => {
  server.close();
  await db.close();
});

describe("Test base url", () => {
  it("GET '/'", async () => {
    const response = await request(app.app).get("/");

    expect(response.statusCode).toBe(200);
  });
});

describe("Test User api", () => {
  const user = {
    email: "jungin@kaist.ac.kr",
    nickname: "jirhee",
    password: "passpass123"
  };

  it("POST /api/user", async () => {
    const response = await request(app.app).post("/api/user").send({ user });

    expect(response.statusCode).toBe(200);

    expect(response.type).toEqual("application/json");
    expect(response.body.user.email).toBe(user.email);
    expect(response.body.user.nickname).toBe(user.nickname);
    expect(response.body.user.description).toBe(null);
    expect(response.body.user.profileimage).toBe(null);
    expect(response.statusCode).toBe(200);
  });

  let token: string;

  it("POST /api/user/login", async () => {
    const response = await request(app.app)
      .post("/api/user")
      .send({ user: { email: user.email, password: user.password } });

    token = response.body.token;

    expect(response.type).toEqual("application/json");
    expect(response.body.user.email).toBe(user.email);
    expect(response.body.user.nickname).toBe(user.nickname);
    expect(response.body.user.description).toBe(null);
    expect(response.body.user.profileimage).toBe(null);
    expect(response.statusCode).toBe(200);
  });

  it("GET /api/user", async () => {
    //TODO send request with token
    const response = await request(app.app)
      .get("/api/user")
      .set("Authorization", `Token ${token}`);

    expect(response.type).toEqual("application/json");
    expect(response.body.user.email).toBe(user.email);
    expect(response.body.user.nickname).toBe(user.nickname);
    expect(response.body.user.description).toBe(null);
    expect(response.body.user.profileimage).toBe(null);
    expect(response.statusCode).toBe(200);
  });

  const newUser = {
    nickname: "newnickname",
    password: "newpassword",
    description: "new description"
  };

  it("PUT /api/user", async () => {
    //TODO send request with token
    const response = await request(app.app)
      .get("/api/user")
      .set("Authorization", `Token ${token}`)
      .send({ user: newUser });

    expect(response.type).toEqual("application/json");
    expect(response.body.user.email).toBe(newUser.nickname);
    expect(response.body.user.description).toBe(newUser.description);
    expect(response.body.user.profileimage).toBe(null);
    expect(response.statusCode).toBe(200);
  });

  it("DELETE /api/user", async () => {
    //TODO send request with token
    const response = await request(app.app)
      .delete("/api/user")
      .set("Authorization", `Token ${token}`);

    expect(response.type).toEqual("application/json");
    expect(response.body.user.email).toBe(newUser.nickname);
    expect(response.body.user.description).toBe(newUser.description);
    expect(response.body.user.profileimage).toBe(null);
    expect(response.statusCode).toBe(200);
  });

  it("GET /api/user with wrong token", async () => {
    const wrongtoken = "wrongwrongwrongwrong";
    const response = await request(app.app)
      .get("/api/user")
      .set("Authorization", `Token ${wrongtoken}`);

    expect(response.statusCode).toBe(401);
  });

  it("POST /api/user/login with not existing username and password", async () => {
    const invalidUser = {
      email: "invalidusername",
      password: "invalidpassword"
    };
    const response = await request(app.app)
      .get("/api/user")
      .send({ user: invalidUser });

    expect(response.statusCode).toBe(442);
  });

  it("POST /api/user register request without all required fields(email, nickname, password)", async () => {
    // password ommited
    const invalidRegister = {
      email: "jungin@kaist.ac.kr",
      nickname: "jirhee"
    };
    const response = await request(app.app)
      .get("/api/user")
      .send({ user: invalidRegister });

    expect(response.statusCode).toBe(442);
  });
});
