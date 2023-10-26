import _ from 'lodash';
import {
  createItem,
  deleteItemById,
  getCollection,
  updateItemById,
} from './tools';
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

export const createBook = async (bookDto: BookDto) => {
  const { isbn } = bookDto;
  const isbnExists = await getBookByIsbn(isbn);
  if (isbnExists) {
    throw ApiError.badRequest('Book with this ISBN already exists'); // simulating a unique constraint on isbn
  }
  const newBook = await createItem('books', bookDto);
  return newBook;
};
