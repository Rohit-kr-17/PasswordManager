import express from "express";
import {
  isAuthenticated,
  SignInController,
  SignUpController,
} from "../controller/user.controller";
import { isAuth } from "../middleware/auth";
const router = express.Router();

router.post("/signUp", SignUpController);
router.post("/signIn", SignInController);
router.get("/isAuth", isAuth, isAuthenticated);

export default router;
