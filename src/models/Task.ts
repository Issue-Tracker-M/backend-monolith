import mongoose, { Document, Model, Types } from "mongoose";
import { UserDocument } from "./User";
import { Label } from "./Workspace";

export interface CommentDocument extends Document {
  content: string;
  author: UserDocument["_id"];
}

const CommentSchema = new mongoose.Schema(
  {
    // id: mongoose.Types.ObjectId,
    content: String,
    author: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
    },
    // attachments:[String],
  },
  { timestamps: true }
);

type CommentModel = Model<CommentDocument>;

export const Comment = mongoose.model<CommentDocument, CommentModel>(
  "Comments",
  new mongoose.Schema({
    content: { type: String, required: true },
    author: mongoose.Types.ObjectId,
  })
);
export enum Priotity {
  not_set,
  low,
  high,
  urgent,
}

export interface Task {
  title: string;
  description?: string;
  due_date?: Date;
  priority: Priotity;
  labels?: Label[];
  users: UserDocument["_id"][] | UserDocument[];
  comments: Comment[];
}

interface TaskBaseDocument extends Task, Document {
  comments: Types.Array<Comment>;
  labels: Types.Array<Label>;
}

export interface TaskDocument extends TaskBaseDocument {
  users: Types.Array<UserDocument["_id"]>;
}
export interface TaskPopulatedDocument extends TaskBaseDocument {
  users: Types.Array<UserDocument>;
}

export type TaskModel = Model<TaskDocument>;

const Tasks = mongoose.model<TaskDocument, TaskModel>(
  "Tasks",
  new mongoose.Schema(
    {
      title: { type: String, required: true },
      description: String,
      due_date: Date,
      priority: { String, default: 0 }, // look into optional types i.e
      labels: [
        {
          name: String,
          color: String,
          id: mongoose.Types.ObjectId,
        },
      ], //reference to labels within this tasks workspace
      users: [
        {
          type: mongoose.Types.ObjectId,
          ref: "Users",
        },
      ],
      comments: [CommentSchema],
      // attachments:[String],
    },
    { timestamps: true }
  )
);

export default Tasks;
