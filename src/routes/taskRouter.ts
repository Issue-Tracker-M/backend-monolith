const router = require("express").Router();
import { createTask } from "../controllers/tasks";

router.post("/", createTask);

export default router;
