const router = require('express').Router();
import { createTask } from '../controllers/tasks';

router.post('/', createTask);

module.exports = router;
