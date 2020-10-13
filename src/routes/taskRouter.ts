const router = require('express').Router();
import { createTask, getTasks } from '../controllers/tasks';

router.post('/', createTask);
router.get('/', getTasks);

module.exports = router;
