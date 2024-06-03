import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "No user with that email found" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" }
    );

    user.resetPasswordToken = token;
    user.resetPasswordExpires = (Date.now() + 3600000) as unknown as Date; // 1 hour
    await user.save();

    // await sendResetEmail(email, token);

    res.status(200).json({ msg: "Password reset link sent to your email" });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token, newPassword } = req.body;

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "secret");
    const user = await User.findOne({
      _id: decoded.id,
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ msg: "Invalid or expired token" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ msg: "Password has been reset" });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findOne({ _id: req.params.id }).select("-password");
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Update user profile
export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email } = req.body;
    const user = await User.findOne({ _id: req.params.id });

    if (!user) {
      return res.status(400).json({ msg: "No user with that id found" });
    }

    if (username) user.username = username;
    if (email) user.email = email;

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
