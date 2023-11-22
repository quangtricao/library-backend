import connect, { MongoHelper } from '../dbHelper';
import { createUser } from '../__fixtures__/createUser';
import { createAdmin } from '../__fixtures__/createAdmin';
import authService from '../../services/authService';

describe('authController', () => {
  let mongoHelper: MongoHelper;

  beforeAll(async () => {
    mongoHelper = await connect();
  });

  test('This test should pass: post /auth/signup create admin', async () => {
    const response = await createAdmin();

    expect(response.accessToken).toBeDefined();
    expect(typeof response.accessToken).toBe('string');
    expect(response.accessToken.length).toBeGreaterThan(0);

    expect(response.user).toBeDefined();
    expect(typeof response.user).toBe('object');
    expect(response.user._id).toBeDefined();
    expect(response.user.password).toBeDefined();
    expect(response.user.lastName).toEqual('admin');
    expect(response.user.firstName).toEqual('admin');
    expect(response.user.role).toEqual('ADMIN');
    expect(response.user.password).toBeDefined();
    expect(response.user.email).toEqual('admin@admin.com');
    expect(response.user.image).toEqual('https://images.com/admin.png');
    expect(response.user.__v).toEqual(0);
  });

  test('This test should pass: post /auth/signup create user', async () => {
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

  test('This test should pass: login as user', async () => {
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

  test('This test should pass: login as admin', async () => {
    const adminLogin = {
      email: 'admin@admin.com',
      password: 'adminadminadmin',
    };

    const loginAsAdmin = await authService.login(adminLogin);
    expect(loginAsAdmin.accessToken).toBeDefined();
    expect(loginAsAdmin.user).toBeDefined();
    expect(loginAsAdmin.user.role).toEqual('ADMIN');
    expect(loginAsAdmin.user.email).toEqual('admin@admin.com');
  });

  afterAll(async () => {
    await mongoHelper.clearDatabase();
    await mongoHelper.closeDatabase();
  });
});
