import { NextFunction, Request, Response } from "express";
import User from "../models/User";

export const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {

const userData = await User.findOne({_id:req.params.id})

    if(userData?.id !== req.params.id && userData?.role !== "ADMIN") return res.status(403).send("You are not allowed to access this resource")
    next();
}