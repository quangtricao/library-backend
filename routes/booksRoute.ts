import express from 'express';
import BooksController from '../controllers/booksController';
import BooksValidator from '../middlewares/booksValidator';
import { passThrowsToMiddleware } from '../utils/passThrowsToMiddleware';

export const booksRouter = express.Router();

booksRouter.get(
  '/',
  BooksValidator.validateBookPagination,
  passThrowsToMiddleware(BooksController.getAllBooks)
);
booksRouter.get(
  '/:isbn',
  BooksValidator.validateBookIsbnParam,
  passThrowsToMiddleware(BooksController.getBookByIsbn)
);
booksRouter.post(
  '/',
  BooksValidator.validateBookDtoInput,
  passThrowsToMiddleware(BooksController.createBook)
);
booksRouter.put(
  '/:isbn',
  BooksValidator.validateBookIsbnParam,
  BooksValidator.validateBookDtoInput,
  passThrowsToMiddleware(BooksController.updateBookByIsbn)
);
booksRouter.delete(
  '/:isbn',
  BooksValidator.validateBookIsbnParam,
  passThrowsToMiddleware(BooksController.deleteBookByIsbn)
);
