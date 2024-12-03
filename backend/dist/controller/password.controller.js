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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sharePassword = exports.deletePassword = exports.modifyPassword = exports.createPassword = exports.getAll = void 0;
const db_1 = require("../db/db");
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.user.id;
        const contents = yield db_1.prisma.post.findMany({
            where: {
                ownerId: id,
            },
        });
        res.status(200).json(contents);
        // const user = req.user;
    }
    catch (err) {
        throw "Internal server error";
    }
});
exports.getAll = getAll;
const createPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content } = req.body;
        const newEntry = yield db_1.prisma.post.create({
            data: {
                title: title,
                content: content,
                ownerId: req.user.id,
            },
        });
        console.log(newEntry);
        res.json({
            message: "Password added successfully",
        });
    }
    catch (err) {
        throw "Internal server error";
    }
});
exports.createPassword = createPassword;
const modifyPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { content, title } = req.body;
        const post = yield db_1.prisma.post.findUnique({
            where: {
                id: parseInt(id),
                ownerId: req.user.id,
            },
        });
        if (!post) {
            res.status(404).json({ message: "Not Found" });
            return;
        }
        yield db_1.prisma.post.update({
            where: {
                id: parseInt(id),
                ownerId: req.user.id,
            },
            data: {
                content: content ? content : post === null || post === void 0 ? void 0 : post.content,
                title: title ? title : post === null || post === void 0 ? void 0 : post.title,
            },
        });
        res.status(200).json({ message: "Post updated successfully" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server errror" });
    }
});
exports.modifyPassword = modifyPassword;
const deletePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const post = yield db_1.prisma.post.findUnique({
            where: {
                id: parseInt(id),
                ownerId: req.user.id,
            },
        });
        if (!post) {
            res.status(404).json({ message: "Invalid request" });
            return;
        }
        yield db_1.prisma.post.delete({
            where: {
                id: parseInt(id),
            },
        });
        res.status(200).json({ message: "Password Deleted Successfully" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.deletePassword = deletePassword;
const sharePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { uuid } = req.body;
        const user = yield db_1.prisma.user.findUnique({
            where: {
                uuid,
            },
        });
        if (!user) {
            res.status(404).json({ message: "Invalid share Id" });
            return;
        }
        const post = yield db_1.prisma.post.findUnique({
            where: {
                id: parseInt(id),
                ownerId: req.user.id,
            },
        });
        if (!post) {
            res.status(404).json({ message: "Invalid Post" });
            return;
        }
        yield db_1.prisma.post.create({
            data: {
                title: post.title,
                content: post.content,
                ownerId: user.id,
                sharedAt: new Date(),
            },
        });
        res.status(200).json({ message: "Password shared" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json("Internal server error");
    }
});
exports.sharePassword = sharePassword;
