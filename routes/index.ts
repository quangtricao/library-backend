import { loggingMiddleware } from '../middlewares/logging';
import { booksRouter } from './booksRoute';
import { genresRouter } from './genreRoute';
import itemsRoute from './itemsRoute';
import express from 'express';

export const router = express.Router();

// Set your routes here by entity as follows:
router.use('/items', itemsRoute);
router.use('/books', booksRouter);
router.use('/genres', loggingMiddleware, genresRouter);
