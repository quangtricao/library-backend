import { booksRouter } from './booksRoute';
import { genresRouter } from './genresRoute';
import { userRouter } from './usersRoute';
import itemsRoute from './itemsRoute';
import express from 'express';
import { errorLoggingMiddleware } from '../middlewares/error';

export const router = express.Router();

// Set your routes here by entity as follows:
router.use('/api/v1/items', itemsRoute);
router.use('/api/v1/books', booksRouter);
router.use('/api/v1/genres', genresRouter);
router.use('/api/v2/users', userRouter);

router.use(errorLoggingMiddleware);
