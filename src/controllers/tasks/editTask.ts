import { Request, Response } from "express";
import Tasks from "../../models/Task";

export async function editTask(req: Request, res: Response): Promise<void> {
  const {
    title,
    description,
    due_date,
    priority,
    labels,
    users,
    comments,
  } = req.body;
  const updatedTaskDetails = {
    title,
    description,
    due_date,
    priority,
    labels,
    users,
    comments,
  };
  const taskId = req.params.task_id;

  try {
    const task = await Tasks.findById({ _id: taskId });
    if (!task) {
      res.status(404).json({ message: "task not found " });
      return;
    }
    const updatedTask = await Tasks.findOneAndUpdate(
      { _id: taskId },
      { $set: updatedTaskDetails },
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
