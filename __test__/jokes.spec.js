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
    const res = await supertest(server).get("/api/jokes");
    expect(res.type).toBe("application/json");
  });

  /*   it("GET /api/jokes/:id", async () => {
    const res = await supertest(server).get("/api/jokes/1");
    expect(res.statusCode).toBe(200);
    expect(res.type).toBe("application/json");
    expect(res.body.username).toBe("joe200");
    expect(res.body.role).toBe("normal");
  });
 */
});
