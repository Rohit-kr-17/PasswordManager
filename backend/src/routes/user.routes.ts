import express from "express";
import {
  SignInController,
  SignUpController,
} from "../controller/user.controller";
import { isAuth } from "../middleware/auth";
const router = express.Router();

router.post("/signUp", SignUpController);
router.post("/signIn", SignInController);

export default router;
