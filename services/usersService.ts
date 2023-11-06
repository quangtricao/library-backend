import { UserDto } from '../types/users';
import UserModel from '../models/User';
import { ApiError } from '../errors/ApiError';

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

const createOne = async (userDto: UserDto) => {
  const user = await UserModel.create(userDto);
  return user;
};

const updateOne = async (id: string, userDto: UserDto) => {
try {
  const updatedUser = await UserModel.findByIdAndUpdate(id, userDto, { new: true });

  if (!updatedUser) {
    throw ApiError.resourceNotFound('User ID not found');
  }

  return updatedUser;
} catch (error: unknown) {
    throw ApiError.internal('Internal Server Error', error);
}
};

const deleteOne = async (id: string) => {
  const deleteUser = await UserModel.findById(id);
  if (!deleteUser) {
    throw ApiError.resourceNotFound('User ID not found');
  }
  await deleteUser.deleteOne();
};

export default {
  findAll,
  findOne,
  createOne,
  updateOne,
  deleteOne,
};
