const supertest = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig");
const bcrypt = require("bcryptjs");

beforeEach(async () => {
  await db("users").truncate();
});

afterAll(async () => {
  await db.destroy();
});

describe("users integration tests", () => {
  //CREATE USER
  it("POST /api/users", async () => {
    const data = {
      id: 1,
      username: "Jake",
      password: "abc123",
      role: "admin",
    };

    const credentials = data;
    const hash = bcrypt.hashSync(credentials.password, 14);

    credentials.password = hash;

    const res = await supertest(server).post("/api/users").send(data);
    expect(res.statusCode).toBe(201);
    expect(res.type).toBe("application/json");

    // find the user in the database by its username then
    let user = db("user").where({ username: data.username }).first();
    if (!user || !bcrypt.compareSync(credentials.password, data.password)) {
      return console.log("Incorrect credentials");
    }

    // the user is valid, continue on

    expect(res.body).toEqual({
      id: 1,
      username: "Jake",
      password: "abc123",
      role: "admin",
    });
  });

  // UPDATE USER
  it("UPDATE /api/users/:id", async () => {
    const data = {
      username: "Viktor",
    };
    let id = 1;
    const result = await supertest(server).put(`/api/users/${id}`).send(data);
    expect(result.type).toBe("application/json");
  });

  it("GET /api/users", async () => {
    let data = {
      id: 1,
      username: "Jake",
      password: "abc123",
      role: "normal",
    };

    await db("users").insert(data);
    const res = await supertest(server).get("/api/users");
    expect(res.statusCode).toBe(200);
    expect(res.type).toBe("application/json");
    expect(res.body[0].username).toBe("Jake");
    expect(res.body[0].role).toBe("normal");
    expect(res.body).toHaveLength(1);
  });

  it("GET /api/users/:id", async () => {
    let data = {
      id: 1,
      username: "Paul",
      password: "abc123",
      role: "admin",
    };

    await db("users").insert(data);

    let id = 1;
    let result;
    result = await supertest(server).get(`/api/users/${id}`);

    expect(result.body).toEqual({
      id: 1,
      username: "Paul",
      password: "abc123",
      role: "admin",
    });
  });

  it("GET /api/users/:id (not found)", async () => {
    let id = 5000;
    const expectedStatusCode = 200;
    let res;
    res = await supertest(server).get(`/api/users/${id}`);
    expect(res.status).toEqual(expectedStatusCode);
    expect(res.type).toBe("application/json");
  });
});
