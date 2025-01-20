import { prisma } from "../db/db";
import { Response } from "express";
import * as argon2 from "argon2";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { User } from "@prisma/client";

function generateRandomWord() {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  let word = "";
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * letters.length);
    word += letters[randomIndex];
  }
  return word;
}
const SignUpController = async (req: any, res: Response): Promise<any> => {
  try {
    const { email, password, name, googleLogin } = req.body;
    if (googleLogin) {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
          googleLogin: true
        }
      })
      if (user) {
        const token = jwt.sign(
          { userId: user.id },
          process.env.JWT_SECRET as string
        );
        res.cookie("token", token, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
        });
        return res.status(200).json({
          message: "User signed In successfully",
          id: user.id,
          email: user.email,
          secretKey: user.uuid,
          token: token,
        });
      } else {
        const password = generateRandomWord();
        const hash = await argon2.hash(password);
        const user = await prisma.user.create({
          data: {
            email: email,
            name: name,
            uuid: uuidv4(),
            password: hash,
            googleLogin: true,
          },
        });
        const token = jwt.sign(
          { userId: user.id },
          process.env.JWT_SECRET as string
        );
        res.cookie("token", token, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
        });
        return res.status(200).json({
          message: "User signed In successfully",
          id: user.id,
          email: user.email,
          secretKey: user.uuid,
          token: token,
        });
      }
    }
    if (!email || !password || !name) {
      res.status(400).json({ message: "Empty fields" });
      return;
    }
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (user) {
      res.status(409).json({ message: "User already exists" });
      return;
    }
    const hash = await argon2.hash(password);
    const newUser = await prisma.user.create({
      data: {
        email: email,
        name: name,
        uuid: uuidv4(),
        password: hash,
        googleLogin: false,
      },
    });
    const token = jwt.sign(
      { userId: newUser.id },
      process.env.JWT_SECRET as string
    );
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    res.status(200).json({
      message: "User created successfully",
      id: newUser.id,
      email: newUser.email,
      secretKey: newUser.uuid,
      token: token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
};

const SignInController = async (req: any, res: Response): Promise<any> => {
  try {
    const { email, password, googleLogin, name } = req.body;
    if (!googleLogin && (!email || !password)) {
      res.status(400).json({ message: "Email and password are required" });
      return;
    }
    if (googleLogin) {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
          googleLogin: true
        }
      })
      if (user) {
        const token = jwt.sign(
          { userId: user.id },
          process.env.JWT_SECRET as string
        );
        res.cookie("token", token, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
        });
        return res.status(200).json({
          message: "User signed In successfully",
          id: user.id,
          email: user.email,
          secretKey: user.uuid,
          token: token,
        });
      } else {
        const password = generateRandomWord();
        const hash = await argon2.hash(password);
        const user = await prisma.user.create({
          data: {
            email: email,
            name: name,
            uuid: uuidv4(),
            password: hash,
            googleLogin: true,
          },
        });
        const token = jwt.sign(
          { userId: user.id },
          process.env.JWT_SECRET as string
        );
        res.cookie("token", token, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
        });
        return res.status(200).json({
          message: "User signed In successfully",
          id: user.id,
          email: user.email,
          secretKey: user.uuid,
          token: token,
        });
      }
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
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      res.status(200).json({
        message: "User Logged In successfully",
        id: user.id,
        email: user.email,
        secretKey: user.uuid,
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

const isAuthenticated = (req: any, res: Response) => {
  try {
    const { user } = req;
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
    return;
  }
};

const logout = (req: any, res: Response) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
    return;
  }
};

export { SignUpController, SignInController, isAuthenticated, logout };
