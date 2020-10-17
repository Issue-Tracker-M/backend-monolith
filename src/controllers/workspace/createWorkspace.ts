import Joi from 'joi'
import Workspace from '../../models/Workspace'

const schema = Joi.object({
  name: Joi.string().required(),

  labels: Joi.array(),
  users: Joi.array(),
  admin: Joi.string(),
  tasks: Joi.array(),
  history: Joi.array(),
})

const createWorkspace = (req: any, res: any) => {
  const { error, value } = schema.validate(req.body)
  if (error) {
    return res.status(400).json(error)
  }

  const { name, labels, users, admin, tasks, history } = req.body

  const newWorkSpace = new Workspace({
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
