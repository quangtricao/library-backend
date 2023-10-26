/*
author:hientran -julia.th
description: user controller - controller layer
*/
import { Request, Response } from 'express';
import usersService from '../services/usersService';
import { CreateUserDto } from '../types/users';
import { UserApiError } from '../errors/UserApiError';

async function getAllUser(_req: Request, res: Response) {
try {
    const users = await usersService.findAll();
    res.status(200).json(users);
} catch (error) {
    throw UserApiError.InternalError(`${error}`);
}
}

async function getById(req: Request<{ id: string }>, res: Response) {
  const { id } = req.params;
  try {
    const userById = await usersService.findById(id);
    if (!userById) {
      throw UserApiError.ResourceNotFound(`Invalid ID: ${id}`);
    }
    res.status(200).json(userById); 
} catch (error) {
    throw UserApiError.InternalError(`${error}`);
}

}

async function getByEmail(req: Request<{ email: string }>, res: Response) {
  const { email } = req.params;
  try {
    const userByEmail = await usersService.findByEmail(email);
    if (!userByEmail) {
      throw UserApiError.ResourceNotFound(`Invalid Email Address:  ${email}`);
    }
    res.status(200).json(userByEmail);
} catch (error) {
    throw UserApiError.InternalError(`${error}`);
}

}

async function createNewUser(
  req: Request<unknown,unknown, CreateUserDto>,
  res: Response
) {
  const CreateUserDto = req.body;
  try {
    const newUser = await usersService.createOneUser(CreateUserDto);
    res.status(201).json(newUser);
} catch (error) {
    throw UserApiError.InternalError(`${error}`);
}

}

async function alterUser(
  req: Request<{ id: string },unknown, CreateUserDto>,
  res: Response
) {
  const { id } = req.params;
  const CreateUserDto = req.body;
  const updateById = await usersService.updateOneUser(id, CreateUserDto);
  if (!updateById){
    throw UserApiError.ResourceNotFound(`User with ID: ${id}  - not found`);
  }
  res.status(200).json(updateById);
}

async function deleteById(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    const getDeleteId = await usersService.findById(id);
    if (!getDeleteId) {
      throw UserApiError.ResourceNotFound(`User with ID: ${id} - not found`);
    }
    await usersService.deleteOneUser(id);
    res.status(200).json({ message: `User with ID: ${id} - deleted successfully!` });
  }
  

export default {
  getAllUser,
  getById,
  getByEmail,
  createNewUser,
  alterUser,
  deleteById,
};
