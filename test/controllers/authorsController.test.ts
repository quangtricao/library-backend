import request from 'supertest';
import connect, { MongoHelper } from '../dbHelper';
import app from '../../index';

describe('authorsController', () => {
  let mongoHelper: MongoHelper;

  beforeAll(async () => {
    mongoHelper = await connect();
  });

  it('should return all authors', async () => {
    const response = await request(app).get('/api/v1/authors');
    expect(response.body).toEqual([]);
  });

  it('should create an author', async () => {
    const res = await request(app).post('/api/v1/authors').send({
      name: 'Jane Blance',
      bio: 'English novelist known for her six major novels, which interpret, critique and comment upon the British landed gentry at the end of the 18th century.',
      image: 'https://example.com/jane-blance.jpg',
    });
    expect(res.body.name).toEqual('Jane Blance');
  });


  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });
});
