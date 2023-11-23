import request from 'supertest';
import connect, { MongoHelper } from '../dbHelper';
import app from '../..';
import GenreModel from '../../models/Genre';
import genresFixture from '../__fixtures__/genres';
import { createUser } from '../__fixtures__/createUser';
import { createAdmin } from '../__fixtures__/createAdmin';

describe('gernesController', () => {
  let mongoHelper: MongoHelper;

  beforeAll(async () => {
    mongoHelper = await connect();
  });

  it('get /genres', async () => {
    const response = await request(app).get('/api/v1/genres').send();
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      data: { genres: [], pagination: { page: 1, totalPages: 0 } },
      status: 'success',
    });
  });

  it('should not get /genres with incorrect pagination', async () => {
    const response = await request(app).get('/api/v1/genres?page=0&limit=0').send();
    expect(response.status).toBe(400);
  });

  it('get existing genre', async () => {
    const newGenre = await GenreModel.create({ title: genresFixture[0].title });
    const response = await request(app).get(`/api/v1/genres/${newGenre.id}`).send();
    expect(response.status).toBe(200);
  });

  it('should not get non-existing genre', async () => {
    const response = await request(app).get(`/api/v1/genres/${genresFixture[0].id}`).send();
    expect(response.status).toBe(404);
  });

  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });
});

describe('genresController protected routes as user', () => {
  let mongoHelper: MongoHelper;
  let token: string;

  beforeAll(async () => {
    mongoHelper = await connect();
    const { accessToken } = await createUser();
    await GenreModel.create(genresFixture[0]);
    token = accessToken;
  });

  it('should not allow to create a genre', async () => {
    const response = await request(app)
      .post('/api/v1/genres')
      .set('Authorization', `Bearer ${token}`)
      .send(genresFixture[0]);
    expect(response.status).toBe(403);
  });

  it('should not allow to update a genre', async () => {
    const response = await request(app)
      .put(`/api/v1/genres/${genresFixture[0].id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Updated genre' });
    expect(response.status).toBe(403);
  });

  it('should not allow to delete a genre', async () => {
    const response = await request(app)
      .delete(`/api/v1/genres/${genresFixture[0].id}`)
      .set('Authorization', `Bearer ${token}`)
      .send();
    expect(response.status).toBe(403);
  });

  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });
});

describe('genresController protected routes as admin', () => {
  let mongoHelper: MongoHelper;
  let token: string;

  beforeAll(async () => {
    mongoHelper = await connect();
    const { accessToken } = await createAdmin();
    token = accessToken;
  });

  it('creates a genre', async () => {
    const response = await request(app)
      .post('/api/v1/genres')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: genresFixture[0].title,
      });
    expect(response.status).toBe(201);
  });

  it('updates existing genre', async () => {
    const newGenre = await request(app)
      .post('/api/v1/genres')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'New Genre',
      });
    const response = await request(app)
      .put(`/api/v1/genres/${newGenre.body.data._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Updated genre',
      });
    expect(response.status).toBe(200);
    expect(response.body.data.title).toBe('Updated genre');
  });

  it('should not update non-existing genre', async () => {
    const response = await request(app)
      .put(`/api/v1/genres/${genresFixture[0].id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Updated title' });
    expect(response.status).toBe(404);
  });

  it('deletes a genre', async () => {
    const response = await request(app)
      .delete(`/api/v1/genres/${genresFixture[0].id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(204);
  });

  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });
});
