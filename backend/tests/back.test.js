const request = require("supertest");
const { app, INIT } = require("../index");

describe("api", () => {
  beforeAll(async () => {
    await INIT.didInit;
  });

  test("test jenkins2", async () => {
    const response = await request(app)
      .get("/api/staff/requests?staffUsername=staff1")
      .set("user-role", "Staff")
      .expect("Content-Type", /json/);

    console.log(response.body);
  });
});
