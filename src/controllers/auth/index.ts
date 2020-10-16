import { IUser } from "./../../models/User";
import { Request, Response } from "express";
import User from "../../models/User";
import generateToken from "../../utils/generateToken";
import bcrypt from "bcrypt";

/**
 * Registers a new user with username, email & password. Sends back the new user document & token.
 * @param req
 * @param res
 */
export interface registerInput {
  first_name: IUser["first_name"];
  last_name: IUser["last_name"];
  username: IUser["username"];
  password: IUser["password"];
  email: IUser["email"];
}

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      first_name,
      last_name,
      username,
      password,
      email,
    }: registerInput = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      first_name,
      last_name,
      username,
    });

    const user = await newUser.save();

    const token = generateToken(user);

    res.status(201).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export interface loginInput {
  credential: IUser["username"] | IUser["email"];
  password: IUser["password"];
}

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const validPassword = await bcrypt.compare(
      req.body.password,
      (req.user as IUser).password
    );
    if (validPassword) {
      const token = generateToken(req.user as IUser);
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to login" });
  }
};
