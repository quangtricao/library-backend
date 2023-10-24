import { BookType } from '../types/books';
import { getCollection } from './tools';

// Books module to introduce book-specific db methods

export const getAllBooks = async (): Promise<BookType[]> => {
  const books = await getCollection('books');
  return books;
};
