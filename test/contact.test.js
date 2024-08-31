import supertest from "supertest";
import { web } from "../src/aplication/web";
import {
  createManyTestContact,
  createTestContact,
  createTestUser,
  getTestContact,
  removeAllTestContact,
  removeTestUser,
} from "./test_utils";

describe("API /api/contacts", function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeAllTestContact();
    await removeTestUser();
  });

  it("should can create new contact", async () => {
    const result = await supertest(web)
      .post("/api/contacts")
      .set("Authorization", "test")
      .send({
        frist_name: "test",
        last_name: "test",
        email: "test@gmail.com",
        phone: "089283372271",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.frist_name).toBe("test");
    expect(result.body.data.last_name).toBe("test");
    expect(result.body.data.email).toBe("test@gmail.com");
    expect(result.body.data.phone).toBe("089283372271");
  });
  it("should reject if request is not valid", async () => {
    const result = await supertest(web)
      .post("/api/contacts")
      .set("Authorization", "test")
      .send({
        frist_name: "",
        last_name: "test",
        email: "test",
        phone: "0892833722712323423",
      });

    expect(result.status).toBe(400);
    expect(result.body.error).toBeDefined();
  });
});

describe("GET /api/contacts/:contactId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeAllTestContact();
    await removeTestUser();
  });
  it("Should, can get Contact", async function () {
    const testContact = await getTestContact();
    const result = await supertest(web)
      .get("/api/contacts/" + testContact.id)
      .set("Authorization", "test");
    console.log(result.body.email);
    expect(result.status).toBe(200);
    expect(result.body.data.frist_name).toBe(testContact.frist_name);
    expect(result.body.data.last_name).toBe(testContact.last_name);
    expect(result.body.data.email).toBe(testContact.email);
    expect(result.body.data.phone).toBe(testContact.phone);
  });
  it("Should, return 404 if contact id not found", async function () {
    const testContact = await getTestContact();
    const result = await supertest(web)
      .get("/api/contacts/" + testContact.id + 1)
      .set("Authorization", "test");
    console.log(result.body.email);
    expect(result.status).toBe(404);
  });
});

describe("PUT /api/contact/:contactId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeAllTestContact();
    await removeTestUser();
  });

  it("should can update existing contact", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .put("/api/contacts/" + testContact.id)
      .set("Authorization", "test")
      .send({
        frist_name: "kurni",
        last_name: "awan",
        email: "awan@gmail.com",
        phone: "086211173362",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testContact.id);
    expect(result.body.data.frist_name).toBe("kurni");
    expect(result.body.data.last_name).toBe("awan");
    expect(result.body.data.email).toBe("awan@gmail.com");
    expect(result.body.data.phone).toBe("086211173362");
  });
  it("should reject if request is invalid", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .put("/api/contacts/" + testContact.id)
      .set("Authorization", "test")
      .send({
        frist_name: "",
        last_name: "",
        email: "testReject",
        phone: "",
      });

    expect(result.status).toBe(400);
  });
  it("should reject if contact not found", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .put("/api/contacts/" + testContact.id + 1)
      .set("Authorization", "test")
      .send({
        frist_name: "kurni",
        last_name: "awan",
        email: "awan@gmail.com",
        phone: "086211173362",
      });

    expect(result.status).toBe(404);
  });
});

describe("DELETE /api/contact/:contactId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeAllTestContact();
    await removeTestUser();
  });

  it("should can delete contact", async function () {
    let testContact = await getTestContact();
    const result = await supertest(web)
      .delete("/api/contacts/" + testContact.id)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data).toBe("ok");

    testContact = await getTestContact();
    expect(testContact).toBeNull();
  });
  it("should reject contact is not found", async function () {
    let testContact = await getTestContact();
    const result = await supertest(web)
      .delete("/api/contacts/" + testContact.id + 1)
      .set("Authorization", "test");

    expect(result.status).toBe(404);
  });
});

describe("GET /api/contacts", function () {
  beforeEach(async () => {
    await createTestUser();
    await createManyTestContact();
  });

  afterEach(async () => {
    await removeAllTestContact();
    await removeTestUser();
  });

  it("should, can result with out parameter", async () => {
    const result = await supertest(web)
      .get("/api/contacts")
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(10);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(2);
    expect(result.body.paging.total_items).toBe(15);
  });
  it("should, can search to page 2", async () => {
    const result = await supertest(web)
      .get("/api/contacts")
      .query({
        page: 2,
      })
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(5);
    expect(result.body.paging.page).toBe(2);
    expect(result.body.paging.total_page).toBe(2);
    expect(result.body.paging.total_items).toBe(15);
  });
  it("should, can using name", async () => {
    const result = await supertest(web)
      .get("/api/contacts")
      .query({
        name: "test 1",
      })
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_items).toBe(6);
  });
  it("should, can using email", async () => {
    const result = await supertest(web)
      .get("/api/contacts")
      .query({
        email: "test1@gmail.com",
      })
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(1);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_items).toBe(1);
  });
  it("should, can using phone", async () => {
    const result = await supertest(web)
      .get("/api/contacts")
      .query({
        phone: "082833322451",
      })
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_items).toBe(6);
  });
});
