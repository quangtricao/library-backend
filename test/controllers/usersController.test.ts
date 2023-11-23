import connect, { MongoHelper } from '../dbHelper';

describe('usersController', () => {
  let mongoHelper: MongoHelper;
  beforeAll(async () => {
    mongoHelper = await connect();
  });

  test('Dummy test', () => {
    expect(2).toBe(2);
  });

  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });
});
