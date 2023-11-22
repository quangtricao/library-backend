import connect, { MongoHelper } from '../dbHelper';
import genreService from '../../services/genresService';

describe('gernesService', () => {
  let mongoHelper: MongoHelper;

  beforeAll(async () => {
    mongoHelper = await connect();
  });

  test('get /genres', async () => {
    const options = {
      title: '',
      page: 1,
      limit: 20,
    };
    const response = await genreService.getAll(options);
    expect(response).toEqual([]);
  });

  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });
});
