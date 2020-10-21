import supertest from "supertest";
import app from "../../../api/app";
import Workspace from "../../../models/Workspace";

let workspaceId: string;

async function clearDb(): Promise<void> {
  await Workspace.deleteMany({});
}
beforeEach(() => {
  jest.setTimeout(10000);
});

beforeAll(async () => {
  jest.setTimeout(10000);

  try {
    await clearDb();

    const workspace = await supertest(app).post("/api/workspace/").send({
      name: "testworkspace7",
      labels: [],
      admin: "5f7f4800a552e6ec677a2766",
    });

    workspaceId = workspace.body._id;
  } catch (error) {
    console.error(error.name, error.message);
  }
});

describe("delete a workspace", () => {
  it("returns No credentials provided", async () => {
    const res = await supertest(app).delete(
      "/api/workspace/5f7f4800a552e6ec677a2766"
    );
    expect(res.body).toEqual({
      message: "No workspace associated with this id",
    });
    expect(res.status).toBe(404);
  });
  it("returns Product has been removed", async () => {
    const res = await supertest(app).delete(`/api/workspace/${workspaceId}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: "workspace deleted" });
  });
});
