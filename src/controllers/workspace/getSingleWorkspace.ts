import Workspace from '../../models/Workspace'

async function getSingleWorkspace(req: any, res: any) {
  try {
    const workspace = await Workspace.findById(req.params.workspace_id)
    if (!workspace) {
      return res.status(404).json({ message: 'Workspace with id doesnt exist' })
    }
    return res.status(200).json(workspace)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

export default getSingleWorkspace
