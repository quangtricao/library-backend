import request from 'supertest';
import connect, { MongoHelper } from '../dbHelper';
import app from '../..';
import { createAdmin } from '../__fixtures__/createAdmin';
import booksFixture from '../__fixtures__/books';
import { createUser } from '../__fixtures__/createUser';

describe('booksController', () => {
  let mongoHelper: MongoHelper;

  beforeAll(async () => {
    mongoHelper = await connect();
  });

  test('get /books', async () => {
    const response = await request(app).get('/api/v1/books').send();
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  test('get /books with incorrect pagination fails', async () => {
    const response = await request(app).get('/api/v1/books?page=0&limit=0').send();
    expect(response.status).toBe(400);
  });

  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });
});

describe('booksController protected routes – user', () => {
  let mongoHelper: MongoHelper;
  let token: string;

  beforeAll(async () => {
    mongoHelper = await connect();
    const { accessToken } = await createUser();
    token = accessToken;
  });

  it('should not allow to create a book', async () => {
    const response = await request(app)
      .post('/api/v1/books')
      .set('Authorization', `Bearer ${token}`)
      .send(booksFixture[0]);
    expect(response.status).toBe(403);
  });

  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });
});

describe('booksController protected routes – admin', () => {
  let mongoHelper: MongoHelper;
  let token: string;

  beforeAll(async () => {
    mongoHelper = await connect();
    const { accessToken } = await createAdmin();
    token = accessToken;
  });

  it('creates a book', async () => {
    const response = await request(app)
      .post('/api/v1/books')
      .set('Authorization', `Bearer ${token}`)
      .send(booksFixture[0]);
    expect(response.status).toBe(201);
  });

  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });
});
