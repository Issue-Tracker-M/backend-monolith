import { Response } from "express";
import Task, { IComment } from "../../../models/Task";
import { AuthorizedRequest } from "../../auth/middleware";

export const editComment = async (
  req: AuthorizedRequest<
    { task_id: string; comment_id: string },
    Partial<IComment>
  >,
  res: Response
): Promise<void> => {
  const { task_id, comment_id } = req.params;
  try {
    const task = await Task.findById(task_id).exec();
    if (!task) {
      res.status(404).end();
      return;
    }
    task.comments.id(comment_id).set(req.body);
    await task.save();
    res.status(200).end();
  } catch (error) {
    res.status(500).end();
  }
};
