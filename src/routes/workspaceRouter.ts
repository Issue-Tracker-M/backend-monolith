const router = require('express').Router()
import {
  getWorkspaces,
  createWorkspace,
  editWorkspace,
  getSingleWorkspace,
  deleteWorkspace,
} from '../controllers/workspace/index'

// @route POST /api/workspace/
// @desc Add a workspace
// @access Private
router.post('/', createWorkspace)

// @route GET /api/workspace/
// @desc Get all workspaces
// @access Private
router.get('/', getWorkspaces)

// @route GET /api/workspace/
// @desc Get all workspaces
// @access Private
router.get('/', getWorkspaces)

// @route PUT /api/workspace/:workspace_id
// @desc Edit a workspaces's details
// @access Private
router.put('/:workspace_id', editWorkspace)

// @route GET /api/workspace/:workspace_id
// @desc Get a workspaces
// @access Private
router.get('/:workspace_id', getSingleWorkspace)

// @route DELETE /api/workspace/:workspace_id
// @desc Delete a single workspace
// @access Private
router.delete('/:workspace_id', deleteWorkspace)

module.exports = router
