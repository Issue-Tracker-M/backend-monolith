import {
  validateEmailConfirmation,
  validateLoginInput,
  validateRegisterInput,
} from "../controllers/auth/validation";
import { register, login, confirmEmail } from "../controllers/auth";
import { getUserByCredential } from "../controllers/auth/middleware";
import express from "express";

const router = express.Router();
router.post("/register", validateRegisterInput, register);
router.post("/login", validateLoginInput, getUserByCredential, login);
router.post("/confirm_email", validateEmailConfirmation, confirmEmail);

export default router;
