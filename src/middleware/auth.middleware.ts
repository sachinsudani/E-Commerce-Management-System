import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.authorization;

    if(!token){
        return res.status(401).json({msg: "Not authorized"});
    }

    const decoded = jwt.verify(token, "secret");

    if(!decoded){
        return res.status(401).json({msg: "Not authorized"});
    }

    req.params.id = (decoded as {id : string}).id;

    next();
}