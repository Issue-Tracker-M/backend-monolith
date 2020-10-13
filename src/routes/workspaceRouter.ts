const router = require('express').Router()
import { getWorkspaces, createWorkspace } from '../controllers/workspace/index'

// @route POST /api/workspace/
// @desc Add a workspace
// @access Private
router.post('/', createWorkspace)

// @route GET /api/workspace/
// @desc Get all workspaces
// @access Private
router.get('/', getWorkspaces)

module.exports = router
