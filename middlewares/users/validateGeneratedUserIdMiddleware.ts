/*
author:hientran -julia.th
description: validate the User Id 
*/
import { NextFunction, Request, Response } from 'express';
import { UserApiError } from '../../errors/UserApiError';
import { generateNewUserId } from '../../utils/users/generateNewUserId';
import { UserType } from '../../types/users';

const validateGeneratedUserIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { key, collection } = req.body; // Assuming the request body contains key and collection data

  // Check if the key and collection are provided in the request body
  if (!key || !collection) {
    const error = UserApiError.badRequest('Key and collection are required.');
    return res.status(error.code).json({ msg: error.message });
  }

  // Generate a new ID using the provided key and collection
  const newId = generateNewUserId(key, collection);

  // Check if the generated ID follows the correct format
  if (!isValidGeneratedId(newId, collection)) {
    const error = UserApiError.badRequest('Invalid generated user ID format.');
    return res.status(error.code).json({ msg: error.message });
  }

  next();
};

// Function to validate the generated ID format
const isValidGeneratedId = (newId: string, collection: UserType[]): boolean => {
  const existingIds = new Set(collection.map((item) => item.id));
  return !existingIds.has(newId);
};

export default validateGeneratedUserIdMiddleware;
