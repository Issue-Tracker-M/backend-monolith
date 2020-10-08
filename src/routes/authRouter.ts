const router = require('express').Router()
import createUser from '../controllers/users/createUser'

router.post('/create', createUser)

module.exports = router
