"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controller/user.controller");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.post("/signUp", user_controller_1.SignUpController);
router.post("/signIn", user_controller_1.SignInController);
router.get("/check", auth_1.isAuth, user_controller_1.check);
exports.default = router;
