import { Router } from "express";
import { checkToken } from "../controllers/auth/middleware";
import {
  createTask,
  deleteTask,
  editTask,
  getTask,
} from "../controllers/tasks";
const router = Router();
router.post("/", checkToken, createTask);
router.get("/:task_id", checkToken, getTask);
router.put("/:task_id", checkToken, editTask);
router.delete("/:task_id", checkToken, deleteTask);
router.post("/:task_id/comment", checkToken, createTask);
router.get("/:task_id/comment/:comment_id", checkToken, getTask);
router.put("/:task_id/comment/:comment_id", checkToken, editTask);
router.delete("/:task_id/comment/:comment_id", checkToken, deleteTask);

export default router;
