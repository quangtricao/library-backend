import { Request, Response } from 'express';
import BooksService from '../services/booksService';
import StatusLogger from '../utils/statusLogger';
import { BookDto } from '../types/books';
import { getFindAllBooksOptionsFromQuery } from '../utils/books';

async function getAllBooks(req: Request, res: Response) {
  const options = await getFindAllBooksOptionsFromQuery(req.query); // TODO: Think of a way to get parsed/default query params from middleware, i.e. through req object mutation
  const books = await BooksService.findAll(options);
  res.status(200).json(books); // explicit > implicit
}

async function getBookByIsbn(req: Request<{ isbn: string }>, res: Response) {
  const { isbn } = req.params;
  const book = await BooksService.findOne(isbn);
  res.status(200).json(book);
}

async function createBook(req: Request<unknown, unknown, BookDto>, res: Response) {
  const bookDto = req.body;
  const newBook = await BooksService.createOne(bookDto);
  StatusLogger.created('books', newBook.id);
  res.status(201).json(newBook);
}

async function updateBookByIsbn(req: Request<{ isbn: string }, unknown, BookDto>, res: Response) {
  const { isbn } = req.params;
  const bookDto = req.body;
  const updatedBook = await BooksService.updateOne(isbn, bookDto);
  res.status(200).json(updatedBook);
}

async function deleteBookByIsbn(req: Request<{ isbn: string }>, res: Response) {
  const { isbn } = req.params;
  await BooksService.deleteOne(isbn);
  res.status(204).end();
}

export default {
  getAllBooks,
  getBookByIsbn,
  createBook,
  updateBookByIsbn,
  deleteBookByIsbn,
};
