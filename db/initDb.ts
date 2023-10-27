import { authors } from './seeds/authors';
import { getDbPath, writeDb } from './tools';

const data = {
  books: [],
  authors,
  genres: [],
  users: [],
};

writeDb(data).then(() => {
  console.log(`🎉 Database successfully initialized at ${getDbPath()}`);
});
