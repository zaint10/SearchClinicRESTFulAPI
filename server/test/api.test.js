const request = require("supertest");
const app = require("../server.js");

describe("GET /api", () => {
  it("should return an array of clinics", async () => {
    const response = await request(app).get("/api");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});