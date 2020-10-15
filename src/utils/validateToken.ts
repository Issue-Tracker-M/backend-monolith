import jwt from "jsonwebtoken";
import { SECRET } from "../config";

export default function validateToken(
  token: string,
  secret = SECRET
): string | { [key: string]: any } {
  return jwt.verify(token, secret);
}
