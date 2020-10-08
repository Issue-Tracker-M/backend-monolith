import Tasks from '../../models/Workspace'

const createWorkspace = (req: any, res: any) => {
  const { name, labels, users, admin, tasks, history } = req.body

  const newWorkSpace = new Tasks({
    name,
    labels,
    users,
    admin,
    tasks,
    history,
  })

  newWorkSpace
    .save()
    .then((workspace) => {
      res.status(201).json(workspace)
    })
    .catch((err) => {
      return res.status(500).json({ message: err.message })
    })
}

export default createWorkspace
