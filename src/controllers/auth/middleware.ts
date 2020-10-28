import { NextFunction, Request, Response } from "express";
import { JWT_SECRET } from "../../config";
import validateToken from "../../utils/validateToken";
import User, { UserDocument } from "../../models/User";

export interface AuthorizedRequest extends Request {
  user: UserDocument;
}

export interface RequestWithCredentials extends Request {
  headers: Request["headers"] & { authorization: string };
}

/**
 * Extracts user id from token, fetches that user and assigns the user document to req.user
 * @param req
 * @param res
 * @param next
 */
export const checkToken = async (
  req: RequestWithCredentials,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { sub: userID } = validateToken(
      req.headers.authorization,
      JWT_SECRET
    );

    const user = await User.findById(userID).exec();

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: `Confirmation failed ${error.message}` });
  }
};

export const checkForToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.headers.authorization) {
    next();
    return;
  }
  res.status(400).json({ message: "Missing credentials" });
};

/**
 * Fetches a user document depending on the type of credential given, can either be username(alphanumeric) or email
 * @param req
 * @param res
 * @param next
 */
export const getUserByCredential = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const credential: string = req.body.credential;
  try {
    const user = await User.findOne(
      credential.includes("@")
        ? { email: credential }
        : { username: credential }
    ).exec();
    if (!user) {
      res.status(404).json({ message: "No user with such credentials" });
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
  // get credential type
};
