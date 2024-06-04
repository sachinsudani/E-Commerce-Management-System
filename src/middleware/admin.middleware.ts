import { NextFunction, Request, Response } from "express";
import User from "../models/User";

export const adminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userData = await User.findOne({ _id: req.params.userId });

  if (userData?.id === req.params.userId && userData?.role === "USER") {
    return res
      .status(403)
      .send({ message: "You are not allowed to access this resource" });
  }
  next();
};
