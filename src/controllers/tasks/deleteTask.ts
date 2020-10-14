import Tasks from '../../models/Task';

export async function deleteTask(req: any, res: any) {
    const taskId = req.params.task_id;

    try {
        const task = await Tasks.findOne({ _id: taskId });
        if(!task) {
            return res.status(404).json({ message: 'Task does not exist '});
        }
        await Tasks.deleteOne({ _id: taskId });
        return res.status(204).json({ message: 'task has been deleted '});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}