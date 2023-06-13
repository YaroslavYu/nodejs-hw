const mongoose = require("mongoose");
const request = require("supertest");
const bcrypt = require("bcrypt");
const { User } = require("../../models");

const app = require("../../app");
const { DB_HOST_TEST } = process.env;

describe("login app test", () => {
  let server = null;

  beforeAll(async () => {
    server = app.listen(3000);

    await mongoose.connect(DB_HOST_TEST);

    const hashedPassword = await bcrypt.hash("123456", 10);
    await User.create({
      email: "test@mail.com",
      password: hashedPassword,
      verificationToken: "verify_token",
      verify: true,
      subscription: "starter",
    });
  });

  afterAll(async () => {
    await User.deleteOne({ email: "test@mail.com" });

    server.close();
    await mongoose.disconnect();
  });

  it("should respond with status code 200", async () => {
    const response = await request(app).post("/users/login").send({
      email: "test@mail.com",
      password: "123456",
    });

    expect(response.status).toBe(200);
  });

  it("should include a token in the response", async () => {
    const response = await request(app).post("/users/login").send({
      email: "test@mail.com",
      password: "123456",
    });

    expect(response.body.token).toBeDefined();
    expect(typeof response.body.token).toBe("string");
  });

  it("should include a user object with email and subscription in the response", async () => {
    const response = await request(app).post("/users/login").send({
      email: "test@mail.com",
      password: "123456",
    });

    expect(response.body.user).toBeDefined();
    expect(typeof response.body.user).toBe("object");
    expect(response.body.user.email).toBeDefined();
    expect(typeof response.body.user.email).toBe("string");
    expect(response.body.user.subscription).toBeDefined();
    expect(typeof response.body.user.subscription).toBe("string");
  });
});
