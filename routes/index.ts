import { booksRouter } from './booksRoute';
import { genresRouter } from './genresRoute';
import itemsRoute from './itemsRoute';
import { userRouter } from './usersRoute';
import express from 'express';

export const router = express.Router();

// Set your routes here by entity as follows:
router.use('/items', itemsRoute);
router.use('/books', booksRouter);
router.use('/genres', genresRouter);
router.use('/api/v2/users', userRouter);
