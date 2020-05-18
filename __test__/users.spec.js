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
    expect(res.body[0].username).toBe("michael");
    expect(res.body[1].username).toBe("alberto");
  });

  it("GET /api/users/:id", async () => {
    const res = await supertest(server).get("/api/users/1");
    expect(res.statusCode).toBe(200);
    expect(res.type).toBe("application/json");
    expect(res.body.username).toBe("michael");
    expect(res.body.role).toBe("admin");
  });

  it("GET /api/users/:id (not found)", async () => {
    const res = await supertest(server).get("/api/users/500");
    expect(res.statusCode).toBe(401);
    expect(res.type).toBe("application/json");
  });

  //CREATE USER
  it("POST /api/users", async () => {
    
    const data = {
      username: "Rick",
      password: "abc123",
      role: "normal"
    };
    const res = await supertest(server).post("/api/users").send(data);
    expect(res.statusCode).toBe(201);
    expect(res.type).toBe("application/json");
    expect(res.body.username).toBe("roger");
    expect(res.body.role).toBe("normal");
  });

  // UPDATE USER
  it("UPDATE /api/users/:id", async () => {
    const data = {
      username: "Viktor",
      role: "admin",
    };
    const res = await supertest(server).put("/api/users/1").send(data);
    expect(res.status).toBe(200);
    expect(res.type).toBe("application/json");
    expect(res.body.username).toBe("Viktor");
  });
  // UPDATE USER
  it("UPDATE /api/users/:id (user didn't provide role for the user", async () => {
    const data = {
      username: "Viktor",
    };
    const res = await supertest(server).put("/api/users/1").send(data);
    expect(res.status).toBe(400);
    expect(res.type).toBe("application/json");
    expect(res.body).toStrictEqual({
      errorMessage: "Please provide role for the user.",
    });
  });
});
