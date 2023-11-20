import request from 'supertest';
import connect, { MongoHelper } from '../dbHelper';
import app from '../..';

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
