/*
author:hientran -julia.th
file name: types/users.ts
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
