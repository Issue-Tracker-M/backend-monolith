import db from "../models";
import mongoose from "mongoose";
const createUser = (user) => {
  return db.Users.create(user).then((userDoc) => {
    console.log("created user");
    return userDoc;
  });
};
