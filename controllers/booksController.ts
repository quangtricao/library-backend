import { Request, Response } from 'express';
import BooksService from '../services/booksService';
import { CreateBookDto } from '../types/books';
import { ApiError } from '../errors/ApiError';

async function getAllBooks(_req: Request, res: Response) {
  const books = await BooksService.findAll();
  res.status(200).json(books); // explicit > implicit
}

async function getBookByIsbn(req: Request<{ isbn: string }>, res: Response) {
  const { isbn } = req.params;
  const book = await BooksService.findOne(isbn);
  if (!book) {
    throw ApiError.resourceNotFound('Book not found');
  }
  res.status(200).json(book);
}

async function createBook(
  req: Request<unknown, unknown, CreateBookDto>,
  res: Response
) {
  const bookDto = req.body;
  const newBook = await BooksService.createOne(bookDto);
  res.status(201).json(newBook);
}

async function updateBookByIsbn(
  req: Request<{ isbn: string }, unknown, CreateBookDto>,
  res: Response
) {
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
