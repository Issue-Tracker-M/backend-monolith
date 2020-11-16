import { Response } from "express";
import Task, { IComment } from "../../../models/Task";
import { AuthorizedRequest } from "../../auth/middleware";

export const createComment = async (
  req: AuthorizedRequest<{ task_id: string }, IComment>,
  res: Response
): Promise<void> => {
  const { task_id } = req.params;
  const { content, author } = req.body;
  try {
    const task = await Task.findById(task_id).exec();
    if (!task) {
      res.status(404).end();
      return;
    }
    const commentIndex = task.comments.push({ author, content }) - 1;
    await task.save();
    res.status(200).json(task.comments[commentIndex]);
  } catch (error) {
    res.status(500).end();
  }
};
