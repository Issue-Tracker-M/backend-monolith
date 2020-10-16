import { NextFunction, Request, Response } from "express";
import { JWT_SECRET } from "../../config";
import validateToken from "../../utils/validateToken";
import User from "../../models/User";

/**
 * Extracts user id from token, fetches that user and appends the user object to req.user
 * @param req
 * @param res
 * @param next
 */
export const checkToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.body;
    const decodedToken = validateToken(token, JWT_SECRET);
    const userID = decodedToken.sub;
    const user = await User.findById(userID).exec();
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(401).json({ message: "Forbidden" });
    }
  } catch (error) {
    res.status(500).json({ message: `Confirmation failed ${error.message}` });
  }
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
    console.log(credential);
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
