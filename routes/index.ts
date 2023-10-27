import { booksRouter } from './booksRoute';
import { genresRouter } from './genresRoute';
import itemsRoute from './itemsRoute';
import express from 'express';
import { errorLoggingMiddleware } from '../middlewares/error';

export const router = express.Router();

// Set your routes here by entity as follows:
router.use('/items', itemsRoute);
router.use('/books', booksRouter);
router.use('/genres', genresRouter);

router.use(errorLoggingMiddleware);