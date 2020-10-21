import Workspace from "../../models/Workspace";
import { AuthorizedRequest } from "../auth/middleware";
import { Response } from "express";

async function getWorkspaces(
  req: AuthorizedRequest,
  res: Response
): Promise<void> {
  const { workspaces } = req.user;

  try {
    if (workspaces) {
      const workspacesArr = await Workspace.find({
        _id: {
          $in: [...workspaces],
        },
      });
      if (workspacesArr.length === undefined) {
        res.status(404).json({ message: "No workspaces found" });
        return;
      }
      res.status(200).json(workspacesArr);
      return;
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
}

export default getWorkspaces;
