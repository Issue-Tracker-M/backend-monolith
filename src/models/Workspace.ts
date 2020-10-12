import mongoose, { Document } from "mongoose";
import { ITask } from "./Task";
import { IUser } from "./User";

export interface ILabel extends Document {
  name: string;
  color: string;
}

const Label = new mongoose.Schema({
  name: String,
  color: String, //hex color code
});

export interface IChange extends Document {
  [key: string]: any;
}

const Change = new mongoose.Schema({
  //   text: String,
  // what happened // string based on the type of change or a type of possible action

  // what changed  // a reference to the object in the Db, preferably by it's id
  target: { type: mongoose.Types.ObjectId },
  subtarget: { type: mongoose.Types.ObjectId, required: false },
  // who did it  // reference to the user id
  user: { type: mongoose.Types.ObjectId, ref: "Users" },
});

export interface IWorkspace extends Document {
  name: string;
  labels: ILabel[];
  users: IUser["_id"][];
  admin: IUser["_id"];
  tasks: ITask["_id"][];
  history: IChange[];
}

const Workspaces = mongoose.model(
  "Workspace",
  new mongoose.Schema(
    {
      name: String,
      labels: [Label], //all of labels defined for this workspace
      users: [{ type: mongoose.Types.ObjectId, ref: "Users" }], //references to all the users
      admin: { type: mongoose.Types.ObjectId, ref: "Users" },
      tasks: [{ type: mongoose.Types.ObjectId, ref: "Tasks" }],
      history: [Change],
    },
    { timestamps: true }
  )
);

export default Workspaces;
