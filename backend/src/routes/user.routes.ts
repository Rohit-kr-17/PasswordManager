import express from "express";
import {
    check,
  SignInController,
  SignUpController,
} from "../controller/user.controller";
import { isAuth } from "../middleware/auth";
const router = express.Router();

router.post("/signUp", SignUpController);
router.post("/signIn", SignInController);
router.get("/check",isAuth,check)

export default router;
