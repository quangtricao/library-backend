import connect, { MongoHelper } from '../dbHelper';
import { createUser } from '../__fixtures__/createUser';
import authService from '../../services/authService';

describe('authService', () => {
  let mongoHelper: MongoHelper;

  beforeAll(async () => {
    mongoHelper = await connect();
  });

  test('create a user', async () => {
    const response = await createUser();

    expect(response.accessToken).toBeDefined();
    expect(response.user).toBeDefined();
    expect(typeof response.accessToken).toBe('string');
    expect(typeof response.user).toBe('object');
  });

  test('login as user', async () => {
    const loginCredentials = {
      email: 'user@user.com',
      password: 'useruseruser',
    };

    const loginAsUser = await authService.login(loginCredentials);
    expect(loginAsUser.accessToken).toBeDefined();
    expect(loginAsUser.user).toBeDefined();
    expect(loginAsUser.user.role).toEqual('USER');
    expect(loginAsUser.user.email).toEqual('user@user.com');
  });

  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });
});
