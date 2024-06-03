import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const jwtSecret = process.env.JWT_SECRET || "secret";

// Signup Validator Middleware
export const signupValidator = [
  body("username")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long"),
  body("email").isEmail().withMessage("Enter a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

// Signup Controller
export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, password, role, email } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ msg: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      password: hashedPassword,
      role,
      email,
    });

    await newUser.save();

    res.status(201).json({ msg: "User created" });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Login Validator Middleware
export const loginValidator = [
  body("username").isLength({ min: 3 }).withMessage("Enter a valid username"),
  body("password").isLength({ min: 6 }).withMessage("Enter a valid password"),
];

// Login Controller
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    const payload = {
      id: user._id,
      role: user.role,
    };

    const token = jwt.sign(payload, jwtSecret, { expiresIn: "1d" });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
