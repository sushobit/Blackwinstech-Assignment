const request = require("supertest");
const app = require("../src/app");

describe("Contacts API", () => {
  it("should return status 200 for GET /contacts", async () => {
    const res = await request(app).get("/contacts");
    expect(res.statusCode).toBe(200);
  });
});
