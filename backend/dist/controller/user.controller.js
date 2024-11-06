"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.isAuthenticated = exports.SignInController = exports.SignUpController = void 0;
const db_1 = require("../db/db");
const argon2 = __importStar(require("argon2"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid");
const SignUpController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, name } = req.body;
        const user = yield db_1.prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if (user) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        const hash = yield argon2.hash(password);
        const newUser = yield db_1.prisma.user.create({
            data: {
                email: email,
                name: name,
                uuid: (0, uuid_1.v4)(),
                password: hash,
            },
        });
        const token = jsonwebtoken_1.default.sign({ userId: newUser.id }, process.env.JWT_SECRET);
        res.cookie("token", token);
        res.status(200).json({
            message: "User created successfully",
            id: newUser.id,
            email: newUser.email,
            secreKey: newUser.uuid,
            token: token,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "internal server error" });
    }
});
exports.SignUpController = SignUpController;
const SignInController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "Email and password are required" });
            return;
        }
        const user = yield db_1.prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if (!user) {
            res.status(404).json({ message: "Invalid Credentials" });
            return;
        }
        const isPasswordValid = yield argon2.verify(user.password, password);
        if (isPasswordValid) {
            const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET);
            res.cookie("token", token);
            res.status(200).json({
                message: "User Logged In successfully",
                id: user.id,
                email: user.email,
                secreKey: user.uuid,
                token: token,
            });
            return;
        }
        res.status(404).json({ message: "Invalid Credentials" });
        return;
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "internal server error" });
        return;
    }
});
exports.SignInController = SignInController;
const isAuthenticated = (req, res) => {
    try {
        const { user } = req;
        res.status(200).send(user);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "internal server error" });
        return;
    }
};
exports.isAuthenticated = isAuthenticated;
