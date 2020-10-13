const router = require('express').Router();
import { createTask, getTasks , editTask } from '../controllers/tasks';

router.post('/', createTask);
router.get('/', getTasks);
router.put('/', editTask);

module.exports = router;
