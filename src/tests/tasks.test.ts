import supertest from "supertest";
import app from "../api/app";
import { UserDocument } from "../models/User";
import { WorkspaceDocument } from "../models/Workspace";
import { clearDB, createWorkspace, createUser } from "./test_utils";

let token: string;
let workspace: WorkspaceDocument;
let user: UserDocument;

beforeAll(async (done) => {
  try {
    await clearDB();
    const test_data = await createUser();
    user = test_data.user;
    token = test_data.token;
    workspace = await createWorkspace(user._id);
    done();
  } catch (error) {
    console.error(error.name, error.message);
  }
});

describe("Tasks");
