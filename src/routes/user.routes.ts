import express from 'express';
import { SignUpController } from '../controller/user.controller';
const router = express.Router();

router.get("/",SignUpController);

export default router