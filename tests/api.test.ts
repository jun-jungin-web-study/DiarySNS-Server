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
    db = await dbConnection;

    await bootstrap(db).then(application => {
      app = application;
    });
    server = app.listen(ENV_CONFIG.PORT);
  } catch (e) {
    logger.error(`Test bootstrapping failed: ${e}`);
  }
});

afterAll(async () => {
  await db.dropDatabase();
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
    expect(response.body.user.profileImage).toBe(null);
  });

  let token: string;

  it("POST /api/user/login", async () => {
    const response = await request(app.app)
      .post("/api/user/login")
      .send({ user: { email: user.email, password: user.password } });

    token = response.body.user.token;

    expect(response.type).toEqual("application/json");
    expect(response.body.user.email).toBe(user.email);
    expect(response.body.user.nickname).toBe(user.nickname);
    expect(response.body.user.description).toBe(null);
    expect(response.body.user.profileImage).toBe(null);
    expect(response.statusCode).toBe(200);
  });

  it("GET /api/user", async () => {
    const response = await request(app.app)
      .get("/api/user")
      .set("Authorization", `Bearer ${token}`);

    token = response.body.user.token;

    expect(response.type).toEqual("application/json");
    expect(response.body.user.email).toBe(user.email);
    expect(response.body.user.nickname).toBe(user.nickname);
    expect(response.body.user.description).toBe(null);
    expect(response.body.user.profileImage).toBe(null);
    expect(response.statusCode).toBe(200);
  });

  const UserUpdateInfo = {
    nickname: "newnickname",
    password: "newpassword",
    description: "new description"
  };

  it("PUT /api/user", async () => {
    //TODO send request with token
    const response = await request(app.app)
      .put("/api/user")
      .set("Authorization", `Bearer ${token}`)
      .send({ user: UserUpdateInfo });

    token = response.body.user.token;

    expect(response.type).toEqual("application/json");
    expect(response.body.user.nickname).toBe(UserUpdateInfo.nickname);
    expect(response.body.user.description).toBe(UserUpdateInfo.description);
    expect(response.body.user.profileImage).toBe(null);
    expect(response.statusCode).toBe(200);
  });

  it("DELETE /api/user", async () => {
    //TODO send request with token
    const response = await request(app.app)
      .delete("/api/user")
      .set("Authorization", `Bearer ${token}`);

    expect(response.type).toEqual("application/json");
    expect(response.body.user.email).toBe(user.email);
    expect(response.body.user.description).toBe(UserUpdateInfo.description);
    expect(response.body.user.profileImage).toBe(null);
    expect(response.statusCode).toBe(200);
  });

  it("GET /api/user with wrong token", async () => {
    const wrongtoken = "wrongwrongwrongwrong";
    const response = await request(app.app)
      .get("/api/user")
      .set("Authorization", `Bearer ${wrongtoken}`);

    expect(response.statusCode).toBe(401);
  });

  it("POST /api/user/login with not existing username and password", async () => {
    const invalidUser = {
      email: "invalid@email.com",
      password: "invalidpassword"
    };
    const response = await request(app.app).post("/api/user").send({ user: invalidUser });

    expect(response.statusCode).toBe(442);
  });

  it("POST /api/user register request without all required fields(email, nickname, password)", async () => {
    // password ommited
    const invalidRegister = {
      email: "jungin@kaist.ac.kr",
      nickname: "jirhee"
    };
    const response = await request(app.app).post("/api/user").send({ user: invalidRegister });

    expect(response.statusCode).toBe(442);
  });
});
