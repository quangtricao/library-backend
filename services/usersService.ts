import { UserDto } from '../types/users';
import userModel from '../models/User';
import { ApiError } from '../errors/ApiError';

const findAll = async () => {
  const users = await userModel.find();
  return users;
};

const findOne = async (id: string) => {
  const user = await userModel.findById(id);
  if (!user) {
    throw ApiError.resourceNotFound('User not found');
  }
  return user;
};

const createOne = async (userDto: UserDto) => {
  const user = await userModel.create(userDto);
  return user;
};

const updateOne = async (id: string, userDto: UserDto) => {
try {
  const updatedUser = await userModel.findByIdAndUpdate(id, userDto, { new: true });
  const existingUser = await userModel.findOne({ email: userDto.email });

  if (existingUser && existingUser._id.toString() !== id) {
    const errorMessage = 'Internal error - This email is already in use';
    throw ApiError.internal(errorMessage, 500);
  }

  if (!updatedUser) {
    throw ApiError.resourceNotFound('User ID not found');
  }

  return updatedUser;
} catch (error: unknown) {
  const errorMessage = 'Internal error - This email is already in use';
    throw ApiError.internal(errorMessage, error);
}
};

const deleteOne = async (id: string) => {
  const deleteUser = await userModel.findById(id);
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
