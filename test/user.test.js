import bcrypt from "bcrypt";
import supertest from "supertest";
import { web } from "../src/aplication/web.js";
import { createTestUser, getTestUser, removeTestUser } from "./test_utils.js";

describe("POST /api/users", function () {
  afterEach(async () => {
    await removeTestUser();
  });
  it("should register new user", async () => {
    const result = await supertest(web).post("/api/users").send({
      username: "test",
      password: "test",
      name: "test",
    });
    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.name).toBe("test");
    expect(result.body.data.password).toBeUndefined();
  });
  it("should reject if request is invalid", async () => {
    const result = await supertest(web).post("/api/users").send({
      username: "",
      password: "",
      name: "",
    });
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeUndefined();
  });

  it("should reject if  username already", async () => {
    const result = await supertest(web).post("/api/users").send({
      username: "usernameAlready",
      password: "usernameAlready",
      name: "usernameAlready",
    });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeUndefined();
  });
});

describe("POST /api/login", function () {
  // sebelum test
  beforeEach(async () => {
    await createTestUser();
  });
  // setelah test
  afterEach(async () => {
    await removeTestUser();
  });

  it("should can login", async () => {
    const result = supertest(web).post("/api/users/login").send({
      username: "test",
      password: "test",
    });
    expect((await result).status).toBe(200);
    expect((await result).body.data.token).toBeDefined();
    expect((await result).body.data.token).not.toBe("test");
  });
  it("should reject login", async () => {
    const result = supertest(web).post("/api/users/login").send({
      username: "",
      password: "",
    });
    expect((await result).status).toBe(400);
    expect((await result).body.errors).toBeUndefined();
  });
  it("should reject login if password is wrong", async () => {
    const result = supertest(web).post("/api/users/login").send({
      username: "test",
      password: "salah",
    });
    expect((await result).status).toBe(401);
    expect((await result).body.errors).toBeUndefined();
  });
});

describe("GET /api/users/current", function () {
  beforeEach(async () => {
    await createTestUser();
  });
  // setelah test
  afterEach(async () => {
    await removeTestUser();
  });

  it("should can get current user", async () => {
    const result = await supertest(web)
      .get("/api/users/current")
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.name).toBe("test");
  });
  it("should reject if token is", async () => {
    const result = await supertest(web)
      .get("/api/users/current")
      .set("Authorization", "salah");

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeUndefined();
  });
});

describe("PATCH /api/users/current", function () {
  beforeEach(async () => {
    await createTestUser();
  });
  // setelah test
  afterEach(async () => {
    await removeTestUser();
  });

  it("should can update user", async () => {
    const result = await supertest(web)
      .patch("/api/users/current")
      .set("Authorization", "test")
      .send({
        name: "kurniawan",
        password: "coba",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.name).toBe("kurniawan");

    const user = await getTestUser();
    expect(await bcrypt.compare("coba", user.password)).toBe(true);
  });
  it("should can update user name", async () => {
    const result = await supertest(web)
      .patch("/api/users/current")
      .set("Authorization", "test")
      .send({
        name: "kurniawan",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.name).toBe("kurniawan");
  });
  it("should can update user password", async () => {
    const result = await supertest(web)
      .patch("/api/users/current")
      .set("Authorization", "test")
      .send({
        password: "coba",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.name).toBe("test");

    const user = await getTestUser();
    expect(await bcrypt.compare("coba", user.password)).toBe(true);
  });
  it("should return 400 when updating user with empty name and password", async () => {
    const result = await supertest(web)
      .patch("/api/users/current")
      .set("Authorization", "test")
      .send({
        name: "",
        password: "",
      });

    expect(result.status).toBe(400);
  });
  it("should reject if request is not valid", async () => {
    const result = await supertest(web)
      .patch("/api/users/current")
      .set("Authorization", "salah")
      .send({});

    expect(result.status).toBe(401);
  });
});

describe("DELETE /api/users/logout", function () {
  beforeEach(async () => {
    await createTestUser();
  });
  // setelah test
  afterEach(async () => {
    await removeTestUser();
  });
  it("should can logout", async () => {
    const result = supertest(web)
      .delete("/api/users/logout")
      .set("Authorization", "test");

    expect((await result).status).toBe(200);
    expect((await result).body.data).toBe("OK");

    const user = await getTestUser();
    expect(user.token).toBeNull();
  });
  it("should reject logout if token is invalod", async () => {
    const result = supertest(web)
      .delete("/api/users/logout")
      .set("Authorization", "salah");

    expect((await result).status).toBe(401);
  });
});
