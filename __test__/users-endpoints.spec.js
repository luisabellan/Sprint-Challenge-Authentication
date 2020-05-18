const supertest = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig");

beforeEach(async () => {
  await db("users").truncate();
});

afterAll(async () => {
  await db.destroy();
});

describe("users integration tests", () => {
  //CREATE USER
  it("POST /users", async () => {
    const data = { username: "Jake", password='abc123', role='admin' };
    const res = await supertest(server).post("/users").send(data);
    expect(res.statusCode).toBe(201);
    expect(res.type).toBe("application/json");
    expect(res.body.username).toBe("Jake");
  });

  // UPDATE USER
  it("UPDATE /users/:id", async () => {
    const data = {
      username: "Viktor",
    };
    let id = 1;
    const result = await supertest(server).put(`/users/${id}`).send(data);
    expect(result.status).toBe(200);
    expect(result.type).toBe("application/json");
  });

  it("GET /users", async () => {
    let data = {
      username: "Jake",
      role: "normal",
    };

    await db("users").insert(data);
    const res = await supertest(server).get("/users");
    expect(res.statusCode).toBe(200);
    expect(res.type).toBe("application/json");
    expect(res.body[0].username).toBe("Jake");
    expect(res.body[0].role).toBe("normal");
    expect(res.body).toHaveLength(1);
  });

  it("GET /users/:id", async () => {
    let data = {
      username: "Paul",
      role: "admin",
    };

    await db("users").insert(data);

    let id = 1;
    let result;
    result = await supertest(server).get(`/users/${id}`);

    expect(result.body).toEqual({ id: 1, username: "Paul" });
  });

  it("GET /users/:id (not found)", async () => {
    let id = 50;
    const expectedStatusCode = 404;
    let res;
    res = await supertest(server).get(`/users/${id}`);
    expect(res.status).toEqual(expectedStatusCode);
    expect(res.type).toBe("application/json");
  });
});
