import { booksRouter } from './booksRoute';
import { genresRouter } from './genresRoute';
import express from 'express';

export const router = express.Router();

// Set your routes here by entity as follows:
router.use('/books', booksRouter);
router.use('/genres', genresRouter);
