import connect, { MongoHelper } from '../dbHelper';
import authorsFixture from '../__fixtures__/authors';
import booksFixture from '../__fixtures__/books';
import Author from '../../models/Author';
import authorsService from '../../services/authorsService';
import BooksService from '../../services/booksService';

describe('authorsService', () => {
  let mongoHelper: MongoHelper;

  beforeAll(async () => {
    mongoHelper = await connect();
  });
  beforeEach(async () => {
    await Author.deleteMany({});
  });

  test('getBooksByAuthor returns empty array when author has no associated books', async () => {
    const author = await Author.create(authorsFixture[1]);
    const options = {
      name: '',
      page: 1,
      limit: 20,
    };
    const response = await authorsService.getBooksByAuthor(author.id, options);
    expect(response).toEqual([]);
  });
  test('getBooksByAuthor returns associated books for the author', async () => {
    const author = await Author.create(authorsFixture[0]);
    const book = await BooksService.createOne({
      ...booksFixture[0],
      status: 'available',
      authors: [author.id],
    });
    console.log(book);
    const options = {
      name: '',
      page: 1,
      limit: 20,
    };
    const response = await authorsService.getBooksByAuthor(author.id, options);
    console.log(response)
    expect(response).toHaveLength(1)
  });

  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });
});
