import { ApiError } from '../errors/ApiError';
import Book from '../models/Book';
import BookAuthor from '../models/BookAuthor';
import BookGenre from '../models/BookGenre';
import { BookDto } from '../types/books';

async function assignAuthorsToBook(bookId: string, authors: string[]) {
  const bookAuthors = authors.map((authorId) => ({
    bookId,
    authorId,
  }));
  await BookAuthor.insertMany(bookAuthors);
}

async function assignGenresToBook(bookId: string, genres: string[]) {
  const bookGenres = genres.map((genresId) => ({
    bookId,
    genresId,
  }));
  await BookGenre.insertMany(bookGenres);
}

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
  if (bookDto.authors) {
    await assignAuthorsToBook(newBook.id, bookDto.authors);
  }
  if (bookDto.genres) {
    await assignGenresToBook(newBook.id, bookDto.genres);
  }
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
