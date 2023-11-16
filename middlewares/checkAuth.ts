import { NextFunction,Request, Response } from "express";
import { ApiError } from "../errors/ApiError";
import jwt from "jsonwebtoken";
import { DecodedUser } from "../types/users";

export interface WithAuthRequest extends Request{
    decoded?: DecodedUser 
}
export function checkAuth(req: WithAuthRequest , _: Response, next: NextFunction){
    const token = req.headers.authorization?.split(" ")[1]

    if(!token){
        next(ApiError.forbidden("Token is missing."))
        return
    }
    try {

        const decoded = jwt.verify(token, process.env.BASED64_SECRET as string ) as DecodedUser
        req.decoded = decoded
        console.log("From middleware: checkAuth - 200")
        next()
    } catch (error) {
        next(ApiError.forbidden("Invalid token."))
    }
}