import Workspace from '../../models/Workspace'

async function deleteWorkspace(req: any, res: any) {
  const workspaceId = req.params.workspace_id

  try {
    const workspace = await Workspace.findOne({ _id: workspaceId })
    if (!workspace) {
      return res
        .status(404)
        .json({ message: 'No workspace associated with this id' })
    }
    await Workspace.deleteOne({ _id: workspaceId })
    return res.status(200).json({ message: 'workspace deleted' })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

export default deleteWorkspace
