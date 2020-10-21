import supertest from "supertest";
import app from "../../../api/app";
import Workspace from "../../../models/Workspace";
import UserSchema from "../../../models/User";

let workspaceId: string;
let token: string;

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

describe("delete a workspace", () => {
  it("returns No credentials provided", async () => {
    const res = await supertest(app)
      .delete(`/api/workspaces/5f903d3c7c5c078dc905366c`)
      .set("Authorization", token);
    expect(res.body).toEqual({
      message: "No workspace associated with this id",
    });
    expect(res.status).toBe(404);
  });
  it("returns Product has been removed", async () => {
    const res = await supertest(app)
      .delete(`/api/workspaces/${workspaceId}`)
      .set("Authorization", token);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: "workspace deleted" });
  });
});
