const router = require('express').Router();
import createWorkspace from '../controllers/workspace/createWorkspace';

router.post('/', createWorkspace);

module.exports = router;
