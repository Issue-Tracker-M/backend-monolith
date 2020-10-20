import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  _id: string;
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  email: string;
}

export const User = mongoose.model(
  "Users",
  new mongoose.Schema(
    {
      first_name: { type: String, required: true },
      last_name: { type: String, required: true },
      username: { type: String, required: true, unique: true },
      password: { type: String, required: true, minlength: 8, maxlength: 64 },
      email: { type: String, required: true, unique: true, trim: true },
      workspaces: [
        {
          type: mongoose.Types.ObjectId,
          ref: "Workspaces",
        },
      ],
      // identities: look into OAuth and how exactly user is delineated
      provider_ids: {
        type: {
          google: Number,
          github: Number,
        },
        required: false,
      },
    },
    { timestamps: true }
  )
);

export default User;
