const supertest = require("supertest");
const server = require("../index");
const db = require("../data/config");

beforeEach(async () => {
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

describe("users integration tests", () => {
  it("GET /users", async () => {
    const res = await supertest(server).get("/users");
    expect(res.statusCode).toBe(200);
    expect(res.type).toBe("application/json");
    expect(res.body).toHaveLength(8);
    expect(res.body[0].name).toBe("Michael");
    expect(res.body[1].name).toBe("Robert");
  });

  it("GET /users/:id", async () => {
    const res = await supertest(server).get("/users/2");
    expect(res.statusCode).toBe(200);
    expect(res.type).toBe("application/json");
    expect(res.body.name).toBe("Robert");
  });

  it("GET /users/:id (not found)", async () => {
    const res = await supertest(server).get("/users/50");
    expect(res.statusCode).toBe(404);
    expect(res.type).toBe("application/json");

  });
  
 //CREATE USER
  it("POST /users", async () => {
    const data = { name: "Jake" };
    const res = await supertest(server).post("/users").send(data);
    expect(res.statusCode).toBe(201);
    expect(res.type).toBe("application/json");
    expect(res.body.name).toBe("Jake");
  });

  // UPDATE USER
  it("UPDATE /users/:id", async () => {
    const data = {
      "name": "Viktor"
    }
    const res = await supertest(server).put("/users/1").send(data);
    expect(res.statusCode).toBe(200);
    expect(res.type).toBe("application/json");
    expect(res.body.name).toBe(data.name);
  });
});
