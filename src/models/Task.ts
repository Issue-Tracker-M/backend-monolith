import mongoose, { Document } from "mongoose";
import { IUser } from "./User";
import { ILabel } from "./Workspace";

export interface IComment extends Document {
  content: string;
  author: IUser["_id"];
}

const Comment = new mongoose.Schema(
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

export interface ITask extends Document {
  title: string;
  description: string;
  due_date: Date;
  priority: string;
  labels: { name: string; color: string; id: ILabel["_id"] };
  users: IUser["_id"];
  comments: IComment[];
}

const Tasks = mongoose.model(
  "Tasks",
  new mongoose.Schema(
    {
      title: String,
      description: String,
      due_date: Date,
      priority: String, // look into optional types i.e
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
      comments: [Comment],
      // attachments:[String],
    },
    { timestamps: true }
  )
);

export default Tasks;
