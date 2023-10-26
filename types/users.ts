/*
author:hientran -julia.th
description: types of user DB  - DB's types
*/
export interface UserType {
  id: string;
  username: string;
  password: string;
  role: 'admin' | 'user';
  firstName: string;
  lastName: string;
  email: string;
  jwtToken: string;
  refreshToken: string;
  imgUrl: string;
}

export type CreateUserDto = Omit<UserType, 'id'>;
