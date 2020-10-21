import { Response } from "express";
import Joi from "joi";
import Workspace from "../../models/Workspace";
import { AuthorizedRequest } from "../auth/middleware";

const schema = Joi.object({
  name: Joi.string().required(),

  labels: Joi.array(),
  users: Joi.array(),
  admin: Joi.string(),
  tasks: Joi.array(),
  history: Joi.array(),
});

async function editWorkspace(
  req: AuthorizedRequest,
  res: Response
): Promise<void> {
  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(400).json(error);
    return;
  }

  const workspaceId = req.params.workspace_id;
  const { name, labels, users, admin, tasks, history } = req.body;
  const newWorkspaceDetails = {
    name,
    labels,
    users,
    admin,
    tasks,
    history,
  };
  try {
    const workspace = await Workspace.findById({ _id: workspaceId });
    if (!workspace) {
      res.status(404).json({ message: "workspace with id doesnt exist" });
      return;
    }
    const updatedWorkspace = await Workspace.findOneAndUpdate(
      { _id: workspaceId },
      { $set: newWorkspaceDetails },
      { new: true }
    );
    res.status(200).json({ message: "workspace updated" });
    return;
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export default editWorkspace;
