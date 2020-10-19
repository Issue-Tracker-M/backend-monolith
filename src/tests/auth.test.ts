import { registerInput } from "../controllers/auth";
import app from "../api/app";
import supertest from "supertest";
import User from "../models/User";

beforeAll(async (done) => {
  try {
    await User.deleteMany({});
  } catch (error) {
    console.log(error);
  }
  done();
});

const newUser: registerInput = {
  first_name: "Max",
  last_name: "Plank",
  username: "mplank",
  email: "mplank@gmail.com",
  password: "6.626073",
};

describe("Auth", () => {
  it("User can register with username, email, and password", async (done) => {
    const res = await supertest(app).post("/api/auth/register").send(newUser);
    expect(res.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
        user: expect.any(Object),
      })
    );
    expect(res.status).toBe(201);
    done();
  });

  it("User can login with email & password", async (done) => {
    const res = await supertest(app)
      .post("/api/auth/login")
      .send({ credential: newUser.email, password: newUser.password });
    expect(res.body).toEqual(
      expect.objectContaining({ token: expect.any(String) })
    );
    expect(res.status).toBe(200);
    done();
  });

  it("User can login with username & password", async (done) => {
    const res = await supertest(app)
      .post("/api/auth/login")
      .send({ credential: newUser.username, password: newUser.password });
    expect(res.body).toEqual(
      expect.objectContaining({ token: expect.any(String) })
    );
    expect(res.status).toBe(200);
    done();
  });
});

afterAll(async (done) => {
  try {
    await User.deleteMany({});
  } catch (error) {
    console.log(error);
  }
  done();
});
