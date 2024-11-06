import { prisma } from "../db/db";
import { Request, Response } from "express";
import * as argon2 from "argon2";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

const SignUpController = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (user) {
      res.status(400).json({ message: "User already exists" });
      return;
    }
    const hash = await argon2.hash(password);
    const newUser = await prisma.user.create({
      data: {
        email: email,
        name: name,
        uuid: uuidv4(),
        password: hash,
      },
    });

    const token = jwt.sign(
      { userId: newUser.id },
      process.env.JWT_SECRET as string
    );
    res.cookie("token", token);
    res.status(200).json({
      message: "User created successfully",
      id: newUser.id,
      email: newUser.email,
      secreKey: newUser.uuid,
      token: token,
    });
  
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
};

const SignInController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required" });
      return;
    }
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      res.status(404).json({ message: "Invalid Credentials" });
      return;
    }
    const isPasswordValid = await argon2.verify(user.password, password);

    if (isPasswordValid) {
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET as string
      );
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
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
    return;
  }
};

const isAuthenticated = (req: Request, res: Response) => {
  try {
    const { user } = req;
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
    return;
  }
};

export { SignUpController, SignInController, isAuthenticated };
