import { AuthorizedRequest } from "../auth/middleware";
import { Response } from "express";

async function getWorkspaces(
  req: AuthorizedRequest,
  res: Response
): Promise<void> {
  try {
    if (!req.user.workspaces.length) {
      res.status(404).json({ message: "No workspaces found" });
      return;
    }
    const workspacesArr = (await req.user.populate("workspace").execPopulate())
      .workspaces;
    res.status(200).json(workspacesArr);
    return;
  } catch (err) {
    res.status(500).json(err.message);
  }
}

export default getWorkspaces;
