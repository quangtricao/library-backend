import {
  getAllUsers,
  getUserByEmail,
  getUserById,
  updateUserById,
  createUser,
  deleteUserById,
} from '../db/usertools';
import { CreateUserDto } from '../types/users';

async function findAll() {
  const users = await getAllUsers();
  return users;
}

async function findById(id: string) {
  const userById = await getUserById(id);
  return userById;
}

async function findByEmail(email: string) {
  const userByEmail = await getUserByEmail(email);
  return userByEmail;
}

async function createOneUser(CreateUserDto: CreateUserDto) {
  const newUser = await createUser(CreateUserDto);
  return newUser;
}

async function updateOneUser(id: string, CreateUserDto: CreateUserDto) {
  const updateduser = await updateUserById(id, CreateUserDto);
  return updateduser;
}

async function deleteOneUser(id: string) {
  const deletedUser = await deleteUserById(id);
}

export default {
  findAll,
  findById,
  findByEmail,
  createOneUser,
  updateOneUser,
  deleteOneUser,
};
