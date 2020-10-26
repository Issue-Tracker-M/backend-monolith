import {
  validateLoginInput,
  validateRegisterInput,
} from "../controllers/auth/validation";
import { register, login } from "../controllers/auth";
import {
  getUserByCredential,
  checkToken,
} from "../controllers/auth/middleware";
import express from "express";

const router = express.Router();

router.post("/register", validateRegisterInput, register);
router.post("/login", validateLoginInput, getUserByCredential, login);

module.exports = router;
