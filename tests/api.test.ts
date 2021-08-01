import App from "../src/app";
import request from "supertest";
import { ServerStatus } from "../src/types/types";

const app = new App({ status: ServerStatus.TEST });

describe("test GET on base url", () => {
  it("GET '/'", async () => {
    app.logger?.info("Test GET /");

    const response = await request(app.app).get("/");

    expect(response.statusCode).toBe(200);
  });
});
