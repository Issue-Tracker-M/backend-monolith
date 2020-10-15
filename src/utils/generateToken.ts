import { IUser } from "../models/User";
import { SECRET } from "../config";
import jwt from "jsonwebtoken";

export default function generateToken(
  user: { [key: string]: any },
  secret = SECRET
): string {
  const payload = {
    sub: user._id,
    username: user.username,
  };

  const options = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, secret, options);
}
