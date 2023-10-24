import _ from 'lodash';
import { getCollection } from './tools';

export const getBookByIsbn = async (isbn: string) => {
  const books = await getCollection('books');
  const book = _.find(books, { isbn });
  return book;
};
