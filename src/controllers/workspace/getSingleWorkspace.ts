import { Response } from "express";
import Workspace from "../../models/Workspace";
import { AuthorizedRequest } from "../auth/middleware";

async function getSingleWorkspace(
  req: AuthorizedRequest<{ workspace_id: string }, void>,
  res: Response
): Promise<void> {
  try {
    const workspace = await Workspace.findById(req.params.workspace_id);
    if (!workspace) {
      res.status(404).json({ message: "Workspace with id doesnt exist" });
      return;
    }
    res.status(200).json(workspace);
    return;
  } catch (err) {
    res.status(500).json(err.message);
  }
}

export default getSingleWorkspace;
