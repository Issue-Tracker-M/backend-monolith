import app from "../api/app";
import supertest from "supertest";
import { clearDB, newUser } from "./test_utils";
/* 
iwm is a singleton used by nodemailer-stub to store all of the newly created emails in memory
and give you easy access to them for testing  purposes
 */
const iwm: any = require("nodemailer-stub").interactsWithMail;

beforeAll(async (done) => {
  try {
    await clearDB();
  } catch (error) {
    console.log(error);
  }
  done();
});

describe("Auth", () => {
  it("User can register with username, email, and password. And then confirm their email", async (done) => {
    // Create user and check that it creates correctly
    const input = { ...newUser };
    delete input.is_verified;
    const res = await supertest(app).post("/api/auth/register").send(input);
    expect(res.status).toBe(201);
    // wait for the mail to be put into iwm
    await new Promise((resolve, reject) => {
      setInterval(() => resolve(1), 50);
    });
    // get token from the email
    const email_token = iwm
      .lastMail()
      .content.split("/confirm/")[1]
      .split(`" target`)[0];
    // follow the verification link
    const verification_res = await supertest(app)
      .post("/api/auth/confirm_email")
      .send({ token: email_token });
    // check the response contents to be the right shape
    expect(verification_res.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
        user: expect.any(Object),
      })
    );
    // check the right status
    expect(verification_res.status).toBe(200);

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
    await clearDB();
  } catch (error) {
    console.log(error);
  }
  done();
});
