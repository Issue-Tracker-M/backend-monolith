import { Response } from "express";
import Tasks, { TaskDocument } from "../../models/Task";
import { AuthorizedRequest } from "../auth/middleware";

export async function editTask(
  req: AuthorizedRequest<
    { task_id: string },
    Omit<Partial<TaskDocument>, "comments">
  >,
  res: Response
): Promise<void> {
  const { task_id } = req.params;

  try {
    const task = await Tasks.findById({ _id: task_id });
    if (!task) {
      res.status(404).json({ message: "task not found " });
      return;
    }
    const updatedTask = await Tasks.findOneAndUpdate(
      { _id: task_id },
      { $set: req.body },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "task has been updated", data: updatedTask });
    return;
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
