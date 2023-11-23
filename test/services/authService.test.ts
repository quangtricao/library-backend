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
    expect(typeof response.accessToken).toBe('string');
    expect(response.accessToken.length).toBeGreaterThan(0);

    expect(response.user).toBeDefined();
    expect(typeof response.user).toBe('object');
    expect(response.user._id).toBeDefined();
    expect(response.user.password).toBeDefined();
    expect(response.user.lastName).toEqual('user');
    expect(response.user.firstName).toEqual('user');
    expect(response.user.role).toEqual('USER');
    expect(response.user.password).toBeDefined();
    expect(response.user.email).toEqual('user@user.com');
    expect(response.user.image).toEqual('https://images.com/user.png');
    expect(response.user.__v).toEqual(0);
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
