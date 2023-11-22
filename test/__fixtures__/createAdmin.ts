import { ROLEVALUES } from '../../common/auth';
import UserModel from '../../models/User';
import authService from '../../services/authService';

export async function createAdmin() {
  const adminData = {
    email: 'admin@admin.com',
    password: 'adminadminadmin',
    image: 'https://images.com/admin.png',
    firstName: 'admin',
    lastName: 'admin',
  };
  const { accessToken, user } = await authService.signup(adminData);
  await UserModel.findByIdAndUpdate(user.id, { role: ROLEVALUES.ADMIN });
  return { accessToken, user };
}
