import { NextFunction, Request, Response } from 'express';
import { UserApiError } from '../errors/UserApiError';

export const userApiErrorHandlers = (
  err: typeof UserApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof UserApiError){
    console.error("Middleware: Api Errors is working !")
    res.status(err.code).json({msg: err.message})
    return
  }
  console.log("Middleware: Api Errors is not working properly !");
  res.status(500).json({mgs: "Internal server error."});
};
