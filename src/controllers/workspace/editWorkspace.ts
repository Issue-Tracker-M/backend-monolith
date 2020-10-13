import Workspace from '../../models/Workspace'

async function editWorkspace(req: any, res: any) {
  const workspaceId = req.params.workspace_id
  const { name, labels, users, admin, tasks, history } = req.body
  const newWorkspaceDetails = {
    name,
    labels,
    users,
    admin,
    tasks,
    history,
  }
  try {
    const workspace = await Workspace.findById({ _id: workspaceId })
    if (!workspace) {
      return res.status(404).json({ message: 'workspace wit id doesnt exist' })
    }
    const updatedWorkspace = await Workspace.findOneAndUpdate(
      { _id: workspaceId },
      { $set: newWorkspaceDetails },
      { new: true }
    )
    return res.status(200).json({ message: 'workspace updated' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export default editWorkspace
