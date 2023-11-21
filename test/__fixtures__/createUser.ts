import authService from '../../services/authService';

export async function createUser() {
  const userData = {
    email: 'user@user.com',
    password: 'useruseruser',
    image: 'https://images.com/user.png',
    firstName: 'user',
    lastName: 'user',
  };

  const { accessToken, user } = await authService.signup(userData);
  return { accessToken, user };
}
