import { booksRouter } from './booksRoute';
import itemsRoute from './itemsRoute';
import express from 'express';

export const router = express.Router();

// Set your routes here by entity as follows:
router.use('/items', itemsRoute);
router.use('/books', booksRouter);
