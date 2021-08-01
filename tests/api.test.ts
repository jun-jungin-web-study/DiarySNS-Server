import App from "../src/app";
import request from "supertest";
import { ServerStatus } from "../src/types/types";

const app = new App({ status: ServerStatus.TEST });

describe("Test base url", () => {
  it("GET '/'", async () => {
    app.logger?.info("Test GET /");

    const response = await request(app.app).get("/");

    expect(response.statusCode).toBe(200);
  });
});

describe("Test Login Router", () => {
  it("GET /api/login", async () => {
    app.logger?.info("Test GET /login");

    const response = await request(app.app).get("/api/login");

    expect(response.statusCode).toBe(200);
  });

  it("POST /api/login", async () => {
    app.logger?.info("POST GET /login");

    const login = {
      id: "abcd",
      pw: "12341234"
    };

    const response = await request(app.app).post("/api/login").send(login);

    app.logger?.info(JSON.stringify(response.body));

    expect(response.statusCode).toBe(200);
  });
});
