import request from 'supertest';
import connect, { MongoHelper } from '../dbHelper';
import app from '../..';
import userFixtures from '../__fixtures__/users';

describe('authController', () => {
  let mongoHelper: MongoHelper;

  beforeAll(async () => {
    mongoHelper = await connect();
  });

  test('user signup', async () => {
    const response = await request(app).post('/api/v1/auth/signup').send(userFixtures[0]);
    expect(response.status).toBe(201);
    expect(response.body.accessToken).toBeDefined();
    expect(typeof response.body.accessToken).toBe('string');
    expect(response.body.accessToken.length).toBeGreaterThan(0);
  });

  test('login as user', async () => {
    const response = await request(app).post('/api/v1/auth/login').send({
      email: 'user@user.com',
      password: 'useruseruser',
    });
    expect(response.status).toBe(200);

    expect(response.body.accessToken).toBeDefined();
    expect(typeof response.body.accessToken).toBe('string');
    expect(response.body.accessToken.length).toBeGreaterThan(0);
  });

  test('fails to register a user with an existing email address', async () => {
    const response = await request(app).post('/api/v1/auth/signup').send({
      password: 'KahnaPassword',
      firstName: 'Kahna',
      lastName: 'JJ. Josh',
      email: 'user@user.com',
      image: 'https://images.com/user.png',
    });
    expect(response.status).toBe(400);
  });

  test('fails to create a user due to missing input fields', async () => {
    const response = await request(app).post('/api/v1/auth/signup').send({
      password: 'KahnaPassword',
      firstName: '',
      lastName: 'JJ. Josh',
      email: 'Kahna@hh.com',
      image: '',
    });
    expect(response.status).toBe(400);
  });

  test('fails to log in with incomplete input (missing 1 or 2 fields)', async () => {
    const response1 = await request(app).post('/api/v1/auth/login').send({
      password: 'KahnaPassword',
    });
    expect(response1.status).toBe(400);

    const response2 = await request(app).post('/api/v1/auth/login').send({
      email: '',
      password: '',
    });
    expect(response2.status).toBe(400);
  });

  test('fails to log in with incorrect credentials', async () => {
    const response1 = await request(app).post('/api/v1/auth/login').send({
      email: 'user@user.comMM',
      password: 'useruseruser',
    });
    expect(response1.status).toBe(403);

    const response2 = await request(app).post('/api/v1/auth/login').send({
      email: 'user@user.com',
      password: 'useruseruserUSER',
    });
    expect(response2.status).toBe(403);
  });

  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });
});
