import { Request, Response } from "express";
import Tasks, { Comment } from "../../models/Task";

export const createTask = (req: Request, res: Response): void => {
  const {
    title,
    description,
    due_date,
    priority,
    comments,
    users,
    labels,
  } = req.body;

  const newTask = new Tasks({
    title,
    description,
    due_date,
    priority,
    comments,
    users,
    labels,
  });

  newTask
    .save()
    .then((task) => {
      res.status(201).json(task);
    })
    .catch((err) => {
      return res.status(500).json({ message: err.message });
    });
};
