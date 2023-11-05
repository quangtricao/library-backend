import { ApiError } from '../errors/ApiError';
import Book from '../models/Book';
import { BookDto } from '../types/books';

async function findAll() {
  const books = await Book.find();
  return books;
}

async function findOne(isbn: string) {
  const book = await Book.findByIsbn(isbn);
  return book;
}

async function createOne(bookDto: BookDto) {
  const newBook = await Book.create(bookDto);
  return newBook;
}

async function updateOne(isbn: string, bookDto: BookDto) {
  const updatedBook = await Book.findOneAndUpdate({ isbn }, bookDto, { new: true });
  if (!updatedBook) {
    throw ApiError.resourceNotFound('Book not found');
  }
  return updatedBook;
}

async function deleteOne(isbn: string) {
  const book = await Book.findByIsbn(isbn);
  if (!book) {
    throw ApiError.resourceNotFound('Book not found');
  }
  await book.deleteOne();
}

export default {
  findAll,
  findOne,
  createOne,
  updateOne,
  deleteOne,
};
