const supertest = require("supertest");
const server = require("../api/server.js");
const db = require("../database/dbConfig");

beforeEach(async () => {
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

describe("users integration tests", () => {
  it("GET /users", async () => {
    const res = await supertest(server).get("/api/users");
    expect(res.statusCode).toBe(200);
    expect(res.type).toBe("application/json");
    expect(res.body).toHaveLength(2);
    expect(res.body[0].username).toBe("joe200");
    expect(res.body[1].username).toBe("alberto");
  });

  it("GET /api/users/:id", async () => {
    const res = await supertest(server).get("/api/users/1");
    expect(res.statusCode).toBe(200);
    expect(res.type).toBe("application/json");
    expect(res.body.username).toBe("joe200");
    expect(res.body.role).toBe("normal");
  });

  it("GET /api/users/:id (not found)", async () => {
    const res = await supertest(server).get("/api/users/500");
    expect(res.statusCode).toBe(200);
    expect(res.type).toBe("application/json");
  });

  //CREATE USER
  it("POST /api/users", async () => {
    const data = { username: "mark", role: "normal" };
    const res = await supertest(server).post("/api/users").send(data);
    expect(res.statusCode).toBe(201);
    expect(res.type).toBe("application/json");
    expect(res.body.username).toBe("mark");
    expect(res.body.role).toBe("normal");
  });

  // UPDATE USER
  it("UPDATE /api/users/:id", async () => {
    const data = {
      username: "Viktor"
    };
    const res = await supertest(server).put("/api/users/1").send(data);
    expect(res.status).toBe(200);
    expect(res.type).toBe("application/json");
    expect(res.body.username).toBe("Viktor");
  });
});
