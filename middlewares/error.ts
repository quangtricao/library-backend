import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { ApiError } from '../errors/ApiError';

export function errorLoggingMiddleware(
  error: typeof ApiError | Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (error instanceof ApiError) {
    res.status(error.code).json({ msg: error.message });
    return;
  }

  if (error instanceof mongoose.Error) {
    res.status(400).json({ msg: error.message });
    return;
  }

  if (error instanceof mongoose.mongo.MongoError) {
    res.status(400).json({ msg: `Mongo: ${error.message}` });
    return;
  }

  res.status(500).json({ msg: 'Something went wrong' });
  console.error(error); // So we could see the error in all of its ugliness in the console
}
