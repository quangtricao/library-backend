import _ from 'lodash';
import { deleteItemById, getCollection, updateItemById } from './tools';
import { BookDto } from '../types/books';
import { ApiError } from '../errors/ApiError';

export const getBookByIsbn = async (isbn: string) => {
  const books = await getCollection('books');
  const book = _.find(books, { isbn });
  return book;
};

export const updateBookByIsbn = async (isbn: string, bookDto: BookDto) => {
  const book = await getBookByIsbn(isbn);
  if (!book) {
    throw ApiError.resourceNotFound('Book not found');
  }
  const updatedBook = await updateItemById('books', book.id, bookDto);
  return updatedBook;
};

export const deleteBookByIsbn = async (isbn: string) => {
  const book = await getBookByIsbn(isbn);
  if (!book) {
    throw ApiError.resourceNotFound('Book not found');
  }
  await deleteItemById('books', book.id);
};
