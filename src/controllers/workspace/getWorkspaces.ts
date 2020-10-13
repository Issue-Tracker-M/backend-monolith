import Workspace from '../../models/Workspace'

async function getWorkspaces(req: any, res: any) {
  try {
    const workspaces = await Workspace.find({})
    if (workspaces.length === 0) {
      return res.status(404).json({ message: 'No workspaces found' })
    }
    return res.status(200).json(workspaces)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

export default getWorkspaces
