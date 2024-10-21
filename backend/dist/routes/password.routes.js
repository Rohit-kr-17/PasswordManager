"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const password_controller_1 = require("../controller/password.controller");
const PasswordRouter = express_1.default.Router();
PasswordRouter.get("/", auth_1.isAuth, password_controller_1.getAll);
PasswordRouter.post("/create", auth_1.isAuth, password_controller_1.createPassword);
PasswordRouter.put("/update/:id", auth_1.isAuth, password_controller_1.modifyPassword);
PasswordRouter.delete("/delete/:id", auth_1.isAuth, password_controller_1.deletePassword);
PasswordRouter.post("/share/:id", auth_1.isAuth, password_controller_1.sharePassword);
exports.default = PasswordRouter;
