import User, { User as IUser, UserDocument } from "./../../models/User";
import { EMAIL_SECRET } from "../../config";
import { Request, Response } from "express";
import generateToken from "../../utils/generateToken";
import bcrypt from "bcrypt";
import sendMail from "../../utils/sendEmail";
import confirmEmailTemplate from "../../templates/confirmEmailTemplate";
import { validateToken } from "../../utils/validateToken";

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

interface RegisterRequest extends Request {
  body: registerInput;
}
/**
 * Creates a new user and sends an email confirmation letter.
 * @param req
 * @param res
 */
export const register = async (
  req: RegisterRequest,
  res: Response
): Promise<void> => {
  try {
    const { first_name, last_name, username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
      first_name,
      last_name,
      username,
    });

    const user = await newUser.save();

    const token = generateToken(user, EMAIL_SECRET);

    sendMail({
      subject: "Welcome to Issue Tracker!",
      to: email,
      html: confirmEmailTemplate(first_name + last_name, token),
    });

    res.status(201).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Expected input for the regular login endpoint without Oauth.
 */
export interface loginInput {
  credential: IUser["username"] | IUser["email"];
  password: IUser["password"];
}

/**
 * Regular login requests have the user document with matching credential attached to req.user.
 */
interface LoginRequest extends Request {
  body: loginInput;
  user: UserDocument;
}

/**
 * Checks the validity of given credentials and issues a JWT.
 * @param req
 * @param res
 */
export const login = async (
  req: LoginRequest,
  res: Response
): Promise<void> => {
  try {
    const validPassword = await bcrypt.compare(
      req.body.password,
      req.user.password
    );
    if (validPassword) {
      const token = generateToken(req.user);
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to login" });
  }
};

interface ConfirmEmailRequest extends Request {
  body: {
    token: string;
  };
}
export const confirmEmail = async (
  req: ConfirmEmailRequest,
  res: Response
): Promise<void> => {
  try {
    const { sub } = validateToken(req.body.token, EMAIL_SECRET);
    const user = await User.findOneAndUpdate(
      { _id: sub },
      { is_verified: true }
    ).exec();
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const token = generateToken(user);
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
