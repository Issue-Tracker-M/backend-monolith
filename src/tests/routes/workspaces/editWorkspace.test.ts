import supertest from "supertest";
import app from "../../../api/app";

import Workspace from "../../../models/Workspace";
import UserSchema from "../../../models/User";

let token: string;
let workspaceId: string;
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
    userId = workspace.body.admin;
  } catch (error) {
    console.error(error.name, error.message);
  }
});

describe("edit a workspace", () => {
  it("wrong credentials provided", async () => {
    const res = await supertest(app)
      .put("/api/workspaces/5f7f4800a552e6ec677a2766")
      .send({
        name: "testworkspace8",
        labels: [],
        admin: "5f7f4800a552e6ec677a2766",
        users: ["5f7f4800a552e6ec677a2766"],
        history: [],
        tasks: [],
      })
      .set("Authorization", token);
    expect(res.body).toEqual({ message: "workspace with id doesnt exist" });
    expect(res.status).toBe(404);
  });
  it("returns workspace has been updated", async () => {
    const res = await supertest(app)
      .put(`/api/workspaces/${workspaceId}`)
      .send({
        name: "testworkspace8",
        labels: [],
        admin: userId,
        users: [userId],
        history: [],
        tasks: [],
      })
      .set("Authorization", token);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: "workspace updated" });
  });
});
