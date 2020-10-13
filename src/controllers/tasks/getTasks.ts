import Tasks from "../../models/Task";

export async function getTasks(req: any, res: any) {
  try {
    const tasks = await Tasks.find({});
    if (tasks.length === undefined || tasks === undefined) {
      return res.status(404).json({ message: "Error retrieving tasks" });
    }
    return res.status(200).json(tasks);
  } catch (err) {
    return res.status(500).json(err.message);
  }
}

