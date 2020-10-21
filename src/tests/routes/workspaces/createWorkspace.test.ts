import supertest from "supertest";
import app from "../../../api/app";
import UserSchema from "../../../models/User";
import Workspace from "../../../models/Workspace";

let token: string;
let userId: string;
async function clearDb(): Promise<void> {
  await Workspace.deleteMany({});
  await UserSchema.deleteMany({});
}
beforeEach(() => {
  jest.setTimeout(10000);
});
beforeAll(async () => {
  jest.setTimeout(10000);
  try {
    await clearDb();
  } catch (error) {
    console.error(error.name, error.message);
  }
});

afterAll(async () => {
  try {
    await clearDb();
  } catch (error) {
    console.error(error.name, error.message);
  }
});
describe("create a new workspace", () => {
  beforeAll(async () => {
    try {
      clearDb();
      const response1 = await supertest(app).post("/api/auth/register").send({
        first_name: "logen",
        last_name: "ninefingers",
        username: "logenninefingers",
        password: "12345678",
        email: "logen@ninefingers.com",
      });

      token = response1.body.token;
      userId = response1.body.user._id;
    } catch (error) {
      console.error(error.name, error.message);
    }
  });
  it("returns No credentials provided message", async () => {
    const res = await supertest(app).post("/api/workspaces");
    expect(res.status).toBe(500);
    expect(res.body).toEqual({
      message: "Confirmation failed jwt must be provided",
    });
  });
});

describe("create new workspace", () => {
  it("successfully creates a workspace", async () => {
    const response = await supertest(app)
      .post("/api/workspaces/")
      .send({
        name: "testworkspace7",
        labels: [],
      })
      .set("Authorization", token);

    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();
    expect(response.body.name).toBe("testworkspace7");
    expect(response.body.labels).toStrictEqual([]);
    expect(response.body.tasks).toStrictEqual([]);
    expect(response.body.history).toStrictEqual([]);
    expect(response.body.users).toStrictEqual([userId]);
  });

  it("Name is required", async () => {
    const response = await supertest(app)
      .post("/api/workspaces/")
      .send({
        labels: [],
      })
      .set("Authorization", token);
    expect(response.status).toBe(400);
    expect(response.body).toBeDefined();
  });

  it("labels is an array", async () => {
    const response = await supertest(app)
      .post("/api/workspaces/")
      .send({
        name: "testworkspace7",
        labels: "notanarray",
      })
      .set("Authorization", token);
    expect(response.status).toBe(400);
    expect(response.body).toBeDefined();
  });
});
