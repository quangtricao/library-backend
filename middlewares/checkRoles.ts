import { NextFunction, Response } from "express";
import { Role } from "../types/users";
import { WithAuthRequest } from "../types/users";
import { ApiError } from "../errors/ApiError";

export function checkRoles(...roles: Role[]){ 
    return (req: WithAuthRequest, res: Response, next: NextFunction) => {
        const user = req.decodedUser
        const hasMatchedRole = user && roles.includes(user.role)
        if(!hasMatchedRole){
            next(ApiError.forbidden("Forbidden access !"))
            return
        }
        console.log("From middleware: check authorisation - 200")
        next()
    }
}