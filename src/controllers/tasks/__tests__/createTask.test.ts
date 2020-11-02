import supertest from "supertest";
import app from "../../../api/app";

describe("create a new task", () => {
  it("should create a new task", async () => {
    const response = await supertest(app).post("/api/tasks").send({
      title: "Test Task",
      description: "",
      due_date: "",
      priority: "",
      comments: [],
      users: [],
      labels: [],
    });

    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();
    expect(response.body.title).toBe("Test Task");
    expect(response.body.description).toBe("Test description");
    expect(response.body.due_date).toBe("");
    expect(response.body.priority).toStrictEqual("important");
    expect(response.body.comments).toStrictEqual([]);
    expect(response.body.users).toStrictEqual([]);
    expect(response.body.labels).toStrictEqual([]);
  });

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
  });
});
