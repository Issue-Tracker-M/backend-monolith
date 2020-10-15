import {
  validateLoginInput,
  validateRegisterInput,
} from "../controllers/auth/validation";
import { register, login } from "../controllers/auth";
import { getUserByCredential } from "../controllers/auth/middleware";
const router = require("express").Router();

router.post("/register", validateRegisterInput, register);
router.post("/login", validateLoginInput, getUserByCredential, login);

module.exports = router;
