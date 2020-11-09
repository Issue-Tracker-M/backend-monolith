import { Request, Response } from "express";
import Tasks, { Comment } from "../../models/Task";
import Workspaces from "../../models/Workspace";

export const createTask = (req: Request, res: Response): void => {
  const {
    title,
    description,
    workspace,
    due_date,
    priority,
    comments,
    users,
    labels,
  } = req.body;

  const newTask = new Tasks({
    title,
    description,
    workspace,
    due_date,
    priority,
    comments,
    users,
    labels,
  });

  newTask
    .save()
    .then(async (task) => {
      await Workspaces.findByIdAndUpdate(workspace, {
        $push: { tasks: task._id },
      });
      res.status(201).json(task);
    })
    .catch((err) => {
      return res.status(500).json({ message: err.message });
    });
};
