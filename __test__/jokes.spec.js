const supertest = require("supertest");
const server = require("../api/server.js");
const db = require("../database/dbConfig");

beforeEach(async () => {
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

describe("jokes integration tests", () => {
  it("GET /jokes", async () => {
    const res = await supertest(server).get("/jokes");
    expect(res.type).toBe("application/json");
  });
});
