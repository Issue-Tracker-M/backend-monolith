import mongoose, { Document } from "mongoose";
import { IWorkspace } from "./Workspace";

export interface IUser extends Document {
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  email: string;
  workspaces: IWorkspace[];
}

const User = mongoose.model(
  "Users",
  new mongoose.Schema(
    {
      first_name: { type: String, required: true },
      last_name: { type: String, required: true },
      username: { type: String, required: true },
      password: { type: String, required: true },
      email: { type: String, required: true, unique: true, trim: true },
      workspaces: [
        {
          type: mongoose.Types.ObjectId,
          ref: "Workspaces",
        },
      ],
      // identities: look into OAuth and how exactly user is delineated
    },
    { timestamps: true }
  )
);

export default User;
