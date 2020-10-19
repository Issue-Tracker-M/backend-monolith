<<<<<<< HEAD
import Joi from 'joi'
import Workspace from '../../models/Workspace'

const schema = Joi.object({
  name: Joi.string().required(),
  labels: Joi.array(),
  admin: Joi.string().required(),
})

const createWorkspace = (req: any, res: any) => {
  const { error, value } = schema.validate(req.body)
  if (error) {
    return res.status(400).json(error)
  }

  const { name, labels, admin } = req.body
=======
import { Request, Response } from "express";
import Tasks from "../../models/Workspace";

const createWorkspace = (req: Request, res: Response): void => {
  const { name, labels, users, admin, tasks, history } = req.body;
>>>>>>> e0d4f8919bbcb2f381ef1db08e8b7ba7d4a74682

  const newWorkSpace = new Workspace({
    name,
    labels,
    users: [admin],
    admin,
    tasks: [],
    history: [],
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
