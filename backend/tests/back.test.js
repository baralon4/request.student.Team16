const request = require("supertest");
const { app, INIT, server } = require("../index");
const mongoose = require("mongoose");

describe("api", () => {
  beforeAll(async () => {
    await INIT.didInit;
  });

  afterAll(async () => {
    await mongoose.connection.close();

    if (server) {
      await new Promise((resolve) => {
        server.close(() => {
          console.log("Server closed");
          resolve();
        });
      });
    }
  });

  test("test jenkins2", async () => {
    const response = await request(app)
      .get("/api/staff/requests?staffUsername=staff1")
      .set("user-role", "Staff")
      .expect("Content-Type", /json/);

    console.log(response.body);
  });
});
