import app from "../api/app";
import supertest from "supertest";

describe("index route", () => {
  it("it runs", async (done) => {
    const res = await supertest(app).get("/");
    expect(res.body).toEqual({ message: "API is up 🚀" });
    expect(res.status).toBe(200);
    done();
  });
});
