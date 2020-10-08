import mongoose from "mongoose";

const User = mongoose.model(
  "Users",
  new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    first_name: String,
    last_name: String,
    username: String,
    password: String,
    email: String,
    workspaces: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Workspaces",
      },
    ],
    // identities: look into OAuth and how exactly user is delineated
    timestamps: {},
  })
);

export default User;
