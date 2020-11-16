import { Response } from "express";
import Task, { ITask } from "../../models/Task";
import Workspaces, { Workspace } from "../../models/Workspace";
import { AuthorizedRequest } from "../auth/middleware";

interface TaskInput extends ITask {
  stage: keyof Workspace;
}

export const createTask = async (
  req: AuthorizedRequest<unknown, TaskInput>,
  res: Response
): Promise<void> => {
  const { title, workspace, stage } = req.body;

  const newTask = new Task({
    title,
    workspace,
    stage,
  });

  newTask
    .save()
    .then(async (task) => {
      await Workspaces.findByIdAndUpdate(workspace, {
        $push: { [stage]: task._id },
      });
      res.status(201).json(task);
    })
    .catch((err) => {
      return res.status(500).json({ message: err.message });
    });
};
