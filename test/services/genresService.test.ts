import connect, { MongoHelper } from '../dbHelper';

import GenreModel from '../../models/Genre';
import genreService from '../../services/genresService';
import genresFixture from '../__fixtures__/genres';

describe('gernesService', () => {
  let mongoHelper: MongoHelper;

  beforeAll(async () => {
    mongoHelper = await connect();
  });
  beforeEach(async () => {
    await GenreModel.deleteMany({});
  });

  it('GET /genres returns proper format response', async () => {
    const options = {
      title: '',
      page: 1,
      limit: 20,
    };
    const response = await genreService.getAll(options);
    expect(response).toMatchObject({ genres: [], pagination: { page: 1, totalPages: 0 } });
  });

  it('GET /genres/:id returns one genre', async () => {
    const newGenre = await GenreModel.create(genresFixture[0]);
    const response = await genreService.getOne(newGenre.id);
    expect(response).toMatchObject(genresFixture[0]);
  });

  it('POST /genres creates a genre', async () => {
    const response = await genreService.create(genresFixture[0]);
    expect(response).toMatchObject(genresFixture[0]);
  });

  it('PUT /genres/:id updates a genre', async () => {
    const newGenre = await GenreModel.create(genresFixture[0]);
    const response = await genreService.update(newGenre.id, genresFixture[1]);
    expect(response).toMatchObject(genresFixture[1]);
  });

  it('DELETE /genres/:id removes a genre', async () => {
    const newGenre = await GenreModel.create(genresFixture[0]);
    await genreService.remove(newGenre.id);
    const findGenre = await GenreModel.findById(newGenre.id);
    expect(findGenre).toEqual(null);
  });

  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });
});
