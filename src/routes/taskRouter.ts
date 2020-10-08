const router = require('express').Router()
import createTask from '../controllers/tasks/createTask'

router.post('/', createTask)

module.exports = router
