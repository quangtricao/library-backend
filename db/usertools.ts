/*
author:hientran -julia.th
file name: db/usertools.ts
*/
import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { CollectionType, DatabaseType } from '../types/db';
import { UserType, CreateUserDto } from '../types/users';
import { generateNewUserId } from '../utils/generateNewUserId';
const { v4: uuidv4 } = require('uuid');

const DB_FILE_NAME = 'data.json';

export const getDbPath = (): string => {
  const __dirname = path.resolve();
  return path.join(__dirname, DB_FILE_NAME);
};

export const readDb = async (): Promise<DatabaseType> => {
  const dbPath = getDbPath();
  const db = await readFile(dbPath, 'utf-8');
  return JSON.parse(db);
};

export const writeDb = async (data: DatabaseType): Promise<void> => {
  const dbPath = getDbPath();
  await writeFile(dbPath, JSON.stringify(data));
};

export const getCollection = async <T extends keyof CollectionType>(
  key: T
): Promise<DatabaseType[T]> => {
  const db = await readDb();
  return db[key];
};

export const setCollection = async <T extends keyof CollectionType>(
  key: T,
  items: DatabaseType[T]
): Promise<void> => {
  const db = await readDb();
  const newState = { ...db, [key]: items };
  await writeDb(newState);
};

export const createUser = async (userDto: CreateUserDto): Promise<UserType> => {
  const users = await getCollection('users');
  
  // Set default role to 'user' if not provided
  const role = userDto.role || 'user';

  // Generate tokens (you can use your own token generation logic)
  const jwtToken = uuidv4(); // Example: Generating a random UUID as a token
  const refreshToken = uuidv4(); // Example: Generating a random UUID as a token

  // Create a new user with default values and generated tokens
  const newId = generateNewUserId('users', users);
  const newUser: UserType = {
      id: newId,
      username: userDto.username || '',
      password: userDto.password || '',
      role: role,
      firstName: userDto.firstName || '',
      lastName: userDto.lastName || '',
      email: userDto.email || '',
      jwtToken: jwtToken,
      refreshToken: refreshToken,
      imgUrl: userDto.imgUrl || ''
  };

  const newUsers = [...users, newUser];
  await setCollection('users', newUsers);
  return newUser;
};

export const updateUserById = async (
  userId: string,
  userDto: Partial<UserType>
): Promise<UserType | undefined> => {
  const users = await getCollection('users');
  const index = users.findIndex((user) => user.id === userId);
  if (index === -1) return undefined;

  const updatedUser = { ...users[index], ...userDto };
  users[index] = updatedUser;
  await setCollection('users', users);
  return updatedUser;
};

export const getUserById = async (userId: string): Promise<UserType | undefined> => {
  const users = await getCollection('users');
  return users.find((user) => user.id === userId);
};

export const getUserByEmail = async (email: string): Promise<UserType | undefined> => {
  const users = await getCollection('users');
  return users.find((user) => user.email === email);
};

export const deleteUserById = async (userId: string): Promise<void> => {
  const users = await getCollection('users');
  const index = users.findIndex((user) => user.id === userId);
  if (index === -1) return;

  const newUsers = [...users.slice(0, index), ...users.slice(index + 1)];
  await setCollection('users', newUsers);
};

export const getAllUsers = async (): Promise<UserType[]> => {
  const users = await getCollection('users');
  return users;
};
