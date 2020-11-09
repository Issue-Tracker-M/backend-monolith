const router = require("express").Router();
import { checkToken } from "../controllers/auth/middleware";
import { createTask } from "../controllers/tasks";

router.post("/", checkToken, createTask);

export default router;
