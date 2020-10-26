import mongoose, { Document, Model, Types } from "mongoose";
import { TaskDocument } from "./Task";
import { UserDocument } from "./User";

export interface Label {
  name: string;
  color: string;
}

const LabelSchema = new mongoose.Schema({
  name: String,
  color: String, //hex color code
});

export interface Change {
  [key: string]: unknown;
}

const ChangeSchema = new mongoose.Schema({
  //   text: String,
  // what happened // string based on the type of change or a type of possible action

  // what changed  // a reference to the object in the Db, preferably by it's id
  target: { type: mongoose.Types.ObjectId },
  subtarget: { type: mongoose.Types.ObjectId, required: false },
  // who did it  // reference to the user id
  user: { type: mongoose.Types.ObjectId, ref: "Users" },
});

export interface Workspace {
  name: string;
  labels?: Label[];
  users?: UserDocument["_id"][] | UserDocument[];
  admin: UserDocument["_id"] | UserDocument;
  tasks?: TaskDocument["_id"][] | TaskDocument[];
  history?: Change[];
}

interface WorkspaceBaseDocument extends Workspace, Document {
  labels: Types.Array<Label>;
  tasks: Types.Array<TaskDocument["_id"]>;
  history: Types.Array<Change>;
}

export interface WorkspaceDocument extends WorkspaceBaseDocument {
  tasks: Types.Array<TaskDocument["_id"]>;
  users: Types.Array<UserDocument["_id"]>;
  admin: UserDocument["_id"];
}

export interface WorkspacePopulatedDocument extends WorkspaceBaseDocument {
  tasks: Types.Array<TaskDocument>;
  users: Types.Array<UserDocument>;
  admin: UserDocument;
}

export type WorkspaceModel = Model<WorkspaceDocument>;

const Workspaces = mongoose.model<WorkspaceDocument, WorkspaceModel>(
  "Workspace",
  new mongoose.Schema(
    {
      name: { type: String, required: true },
      labels: [LabelSchema], //all of labels defined for this workspace
      users: [{ type: mongoose.Types.ObjectId, ref: "Users" }], //references to all the users
      admin: { type: mongoose.Types.ObjectId, ref: "Users", required: true },
      tasks: [{ type: mongoose.Types.ObjectId, ref: "Tasks" }],
      history: [ChangeSchema],
    },
    { timestamps: true }
  )
);

export default Workspaces;
