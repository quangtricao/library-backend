import {
  deleteItemById,
  getCollection,
  getItemById,
  updateItemById,
} from '../db/tools';
import { createUser } from '../db/users';
import { UserDto } from '../types/users';

const findAll = async () => {
  const users = await getCollection('users');
  return users;
};

const findOne = async (id: string) => {
  const user = await getItemById('users', id);
  return user;
};

const createOne = async (userDto: UserDto) => {
  const user = await createUser(userDto);
  return user;
};

const updateOne = async (id: string, userDto: UserDto) => {
  const updatedUser = await updateItemById('users', id, userDto);
  return updatedUser;
};

const deleteOne = async (id: string) => {
  await deleteItemById('users', id);
};

export default {
  findAll,
  findOne,
  createOne,
  updateOne,
  deleteOne,
};
