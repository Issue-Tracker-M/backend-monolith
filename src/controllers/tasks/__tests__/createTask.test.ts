import supertest from "supertest";
import app from "../../../api/app";
import { Priority } from "../../../models/Task";
import { UserDocument } from "../../../models/User";
import { WorkspaceDocument } from "../../../models/Workspace";
import {
  clearDB,
  createUser,
  createWorkspace,
} from "../../../tests/test_utils";

let workspace: WorkspaceDocument;
let user: UserDocument;
let token: string;

beforeAll(async (done) => {
  try {
    await clearDB();

    const test_data = await createUser();
    user = test_data.user;
    token = test_data.token;
    workspace = await createWorkspace(user._id);
  } catch (error) {
    console.log(error);
  }
  done();
});

describe("create a new task", () => {
  it("should create a new task", async (done) => {
    const response = await supertest(app)
      .post("/api/tasks")
      .set("Authorization", token)
      .send({
        title: "Test Task",
        description: "Test description",
        workspace: workspace.id,
        priority: Priority.high,
        comments: [],
        users: [],
        labels: [],
      });
    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();
    expect(response.body.title).toBe("Test Task");
    expect(response.body.description).toBe("Test description");
    expect(response.body.priority).toBe(Priority.high);
    expect(response.body.comments).toStrictEqual([]);
    expect(response.body.users).toStrictEqual([]);
    expect(response.body.labels).toStrictEqual([]);
    done();
  });
  /* 
  it("should throw an error if no title is given", async () => {
    const response = await supertest(app).post("/api/tasks/").send({
      description: "",
      due_date: "",
      priority: "",
      comments: [],
      users: [],
      labels: [],
    });
    expect(response.status).toBe(400);
    expect(response.body).toBeDefined();
  });

  it("should throw an error if labels is not an array", async () => {
    const response = await supertest(app).post("/api/tasks/").send({
      name: "Test Task",
      description: "",
      due_date: "",
      priority: "",
      comments: [],
      users: [],
      labels: "notanarray",
    });
    expect(response.status).toBe(400);
    expect(response.body).toBeDefined();
  });

  it("should throw an error if comments is not an array", async () => {
    const response = await supertest(app).post("/api/tasks/comments").send({
      name: "Test Task",
      description: "",
      due_date: "",
      priority: "",
      comments: "notanarray",
      users: [],
      labels: [],
    });
    expect(response.status).toBe(400);
    expect(response.body).toBeDefined();
  }); */
});

afterAll(async (done) => {
  await clearDB();
  done();
});
