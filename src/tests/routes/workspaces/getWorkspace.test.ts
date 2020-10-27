import supertest from "supertest";
import app from "../../../api/app";
import UserSchema from "../../../models/User";
import Workspace from "../../../models/Workspace";

let token: string;
let workspaceId: string;

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

    const response1 = await supertest(app).post("/api/auth/register").send({
      first_name: "logen",
      last_name: "ninefingers",
      username: "logenninefingers",
      password: "12345678",
      email: "logen@ninefingers.com",
    });

    token = response1.body.token;

    const workspace = await supertest(app)
      .post("/api/workspaces/")
      .send({
        name: "testworkspace7",
        labels: [],
      })
      .set("Authorization", token);

    workspaceId = workspace.body._id;
  } catch (error) {
    console.error(error.name, error.message);
  }
});

describe("get all workspaces", () => {
  test("should return no workspaces found", async () => {
    const response = await supertest(app)
      .get("/api/workspaces/")
      .set("Authorization", token);
    expect(response.status).toBe(200);
  });
});

describe("get a workspace", () => {
  test("should return one workspace by its id", async () => {
    const response = await supertest(app)
      .get(`/api/workspaces/${workspaceId}`)
      .set("Authorization", token);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name", "testworkspace7");
  });
});
