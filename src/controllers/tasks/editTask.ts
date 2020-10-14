import Tasks from '../../models/Task';

export async function editTask(req: any, res: any) {
    const { title, description, due_date, priority, labels, users,  comments } = req.body;
    const updatedTaskDetails = { title, description, due_date, priority, labels, users,  comments }
    const taskId = req.params.task_id;

    try {
        const task = await Tasks.findById({ _id: taskId });
        if(!task) {
            return res.status(404).json({ message: 'task not found '})
        }
        const updatedTask = await Tasks.findOneAndUpdate(
            { _id: taskId },
            {$set: updatedTaskDetails},
            { new: true }
        );
        return res.status(200).json({ message: "task has been updated", data: updatedTask });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}