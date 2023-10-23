import { BookType } from '../types/books';
import { readDb, writeDb } from './tools';

// Books module to introduce book-specific db methods

export const getAllBooks = async (): Promise<BookType[]> => {
  const db = await readDb();
  return db.books;
};

export const addBook = async (book: BookType): Promise<void> => {
  const db = await readDb();
  db.books.push({ ...book, id: 'user-' + Date.now() }); // id is just an example, it's ugly so don't use it
  await writeDb(db);
};
