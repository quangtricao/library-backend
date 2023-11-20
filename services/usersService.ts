import { UserDto } from '../types/users';
import UserModel from '../models/User';
import { ApiError } from '../errors/ApiError';
import Book from '../models/Book';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const SALT_ROUNDS = 12;

const findAll = async () => {
  const users = await UserModel.find();
  return users;
};

const findOne = async (id: string) => {
  const user = await UserModel.findById(id);
  if (!user) {
    throw ApiError.resourceNotFound('User not found');
  }
  return user;
};

const findOneByEmail = async (email: string) => {
  return UserModel.findOne({email});
};

const createOne = async (userDto: UserDto) => {
  const existingUser = await findOneByEmail(userDto.email)
  if(existingUser){
    throw ApiError.badRequest('Email already in use.')
  }
  const hashedPassword = bcrypt.hashSync(userDto.password, SALT_ROUNDS);
  const user = await UserModel.create({
    ...userDto,
    password: hashedPassword,
  });
  return user;
}

const login = async (email: string, password: string) => {
  const user = await findOneByEmail(email);
  if(!user){
    throw ApiError.forbidden('Bad credentials')
  }
  
  const isValid = bcrypt.compareSync(password, user.password)
  if(!isValid){
    throw ApiError.forbidden('Bad credentials')
  }

  const payload = {
   userId: user.id
  }
  console.log("service",user)
  const accessToken = jwt.sign(payload, process.env.TOKEN_SECRET as string)
  console.log(payload)
  return {
    message: "Valid credentials", accessToken, user
  }
}

const updateOne = async (id: string, userDto: UserDto) => {
  if (userDto.password) {
    const hashedPassword = bcrypt.hashSync(userDto.password, SALT_ROUNDS);
    userDto.password = hashedPassword;
  } 

  const updatedUser = await UserModel.findByIdAndUpdate(id, userDto, { new: true });
  if (!updatedUser) {
    throw ApiError.resourceNotFound('User not found');
  }
  return updatedUser;
};

const deleteOne = async (id: string) => {
  const deleteUser = await UserModel.findById(id);
  if (!deleteUser) {
    throw ApiError.resourceNotFound('User not found');
  }
  await deleteUser.deleteOne();
};

const borrowBooks = async (userId: string, bookIds: string[]) => {
  const user = await findOne(userId); 
  const borrowedBooksIds = await Book.borrow(bookIds, user.id);
  return borrowedBooksIds;
};

const returnBooks = async (userId: string, bookIds: string[]) => {
  const user = await findOne(userId);
  const returnedBooksIds = await Book.return(bookIds, user.id);
  return returnedBooksIds;
};

export default {
  findAll,
  findOne,
  createOne,
  updateOne,
  deleteOne,
  borrowBooks,
  returnBooks,
  login,
};
