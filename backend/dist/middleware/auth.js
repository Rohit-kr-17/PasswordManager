"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../db/db");
const isAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(404).json({
                message: "Forbidden resource",
            });
            return;
        }
        const decode = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (!decode || !decode.userId) {
            res.status(404).json({
                message: "Forbidden resource",
            });
            return;
        }
        const user = yield db_1.prisma.user.findUnique({
            where: {
                id: decode.userId,
            },
        });
        if (!user) {
            res.status(404).json({ message: "Invalid Credentials" });
            return;
        }
        req.user = {
            id: user.id,
            email: user.email,
            name: user.name,
            uuid: user.uuid,
        };
        next();
    }
    catch (err) {
        console.log(err);
        res.status(500).json("Internal server error");
    }
});
exports.isAuth = isAuth;
