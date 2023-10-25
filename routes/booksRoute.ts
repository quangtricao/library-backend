import express from 'express';
import {
  createItem,
  deleteItemById,
  getCollection,
  updateItemById,
} from '../db/tools';
import { getBookByIsbn } from '../db/books';
import { CreateBookDto } from '../types/books';
import { errorLoggingMiddleware } from '../middlewares/error';

export const booksRouter = express.Router();
booksRouter.use(errorLoggingMiddleware);

booksRouter.get('/', async (_req, res, next) => {
  try {
    const books = await getCollection('books');
    res.json(books);
  } catch (e) {
    next(e);
  }
});

booksRouter.get('/:isbn', async (req, res, next) => {
  const isbn = req.params.isbn;
  const book = await getBookByIsbn(isbn);
  if (!book) {
    next('Book not found');
    return;
  }
  res.json(book);
});

booksRouter.post('/', async (req, res, next) => {
  const bookData = req.body as CreateBookDto;
  try {
    const book = await createItem('books', bookData);
    res.json(book);
  } catch (e) {
    next(e);
  }
});

booksRouter.put('/:isbn', async (req, res, next) => {
  const isbn = req.params.isbn;
  const bookData = req.body as CreateBookDto;
  try {
    const book = await getBookByIsbn(isbn);
    if (!book) {
      next('Book not found!');
      return;
    }
    const updatedBook = await updateItemById('books', book.id, bookData);
    res.json(updatedBook);
  } catch (e) {
    next(e);
  }
});

booksRouter.delete('/:isbn', async (req, res, next) => {
  const isbn = req.params.isbn;
  try {
    const book = await getBookByIsbn(isbn);
    if (!book) {
      next('Book not found!');
      return;
    }
    await deleteItemById('books', book.id);
    res.json({ message: 'Book deleted' });
  } catch (e) {
    next(e);
  }
});
