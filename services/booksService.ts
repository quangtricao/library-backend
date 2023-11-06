import { ApiError } from '../errors/ApiError';
import Book from '../models/Book';
import { BookDto } from '../types/books';

async function findAll() {
  const books = await Book.find();
  return books;
}

async function findOne(isbn: string) {
  const book = await Book.findByIsbn(isbn);
  if (!book) {
    throw ApiError.resourceNotFound('Book not found');
  }
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
  await Book.findOneAndDelete({ isbn });
}

export default {
  findAll,
  findOne,
  createOne,
  updateOne,
  deleteOne,
};
