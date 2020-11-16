import { Response } from "express";
import Tasks from "../../models/Task";
import { AuthorizedRequest } from "../auth/middleware";

export async function deleteTask(
  req: AuthorizedRequest<{ task_id: string }, undefined>,
  res: Response
): Promise<void> {
  const taskId = req.params.task_id;

  try {
    const task = await Tasks.findOne({ _id: taskId });
    if (!task) {
      res.status(404).json({ message: "Task does not exist" });
      return;
    }
    await Tasks.deleteOne({ _id: taskId });
    res.status(204).json({ message: "Task has been deleted" });
    return;
  } catch (error) {
    res.status(500).json({ message: error.message });
    return;
  }
}
