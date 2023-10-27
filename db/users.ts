import { ApiError } from '../errors/ApiError';
import { UserDto, UserType } from '../types/users';
import { createItem, getCollection } from './tools';

export const getUserByEmail = async (
  email: string
): Promise<UserType | undefined> => {
  const users = await getCollection('users');
  return users.find((user) => user.email === email);
};

export const createUser = async (userDto: UserDto) => {
  const { email } = userDto;
  const emailExists = await getUserByEmail(email);
  if (emailExists) {
    throw ApiError.badRequest('This email is already taken'); // Unique email restriction
  }
  const newUser = await createItem('users', { ...userDto, role: 'user' }); // Make em users by default
  return newUser;
};
