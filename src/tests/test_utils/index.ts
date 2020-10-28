import { registerInput } from "../../controllers/auth";
import ConfirmationToken from "../../models/ConfirmationToken";
import PasswordResetToken from "../../models/PasswordResetToken";
import User, { UserDocument } from "../../models/User";
import Workspace from "../../models/Workspace";
import generateToken from "../../utils/generateToken";

export const newUser: registerInput = {
  first_name: "Max",
  last_name: "Plank",
  username: "mplank",
  email: "mplank@gmail.com",
  password: "6.626073",
  is_verified: false,
};

export const createUser = async (
  userData = newUser,
  verified = true
): Promise<{ user: UserDocument; token: string }> => {
  userData.is_verified = verified;
  const user = await new User(userData).save();
  const token = generateToken(user);
  return { user, token };
};

export const clearUsers = async (): Promise<void> => {
  await User.deleteMany({});
};

export const clearWorkspaces = async (): Promise<void> => {
  await Workspace.deleteMany({});
};

export const clearTokens = async (): Promise<void> => {
  await Promise.all([
    ConfirmationToken.deleteMany({}),
    PasswordResetToken.deleteMany({}),
  ]);
};

export const clearDB = async (): Promise<void> => {
  await Promise.all([clearTokens(), clearUsers(), clearWorkspaces()]);
};
