import express from 'express';

import { CreateGenreDTO } from '../types/genres';
import {
  getCollection,
  getItemById,
  createItem,
  updateItemById,
  deleteItemById,
} from '../db/tools';
import { errorLoggingMiddleware } from '../middlewares/error';
import { validateIdMiddleware } from '../middlewares/validateId';

export const genresRouter = express.Router();
genresRouter.use(errorLoggingMiddleware);
genresRouter.use('/:id', validateIdMiddleware);

genresRouter.get('/', async (_req, res, next) => {
  try {
    const genreInDB = await getCollection('genres');
    res.json(genreInDB);
  } catch (error) {
    next(error);
  }
});

genresRouter.post('/', async (req, res, next) => {
  const body = req.body as CreateGenreDTO;
  if (!body.books || !body.title) {
    next({ message: 'Missing a property in body of the request.' });
    return;
  }

  if (!(typeof body.books === 'object') || body.books.length === 0) {
    next({
      message: 'books property must be an array and must not be empty.',
    });
    return;
  }

  for (const key in body.books) {
    if (typeof body.books[key] !== 'string') {
      next({
        message: 'books property must be an array of string.',
      });
      return;
    }
  }

  try {
    const newGenre = await createItem('genres', body);
    res.json(newGenre);
  } catch (error) {
    next(error);
  }
});

genresRouter.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    const foundGenre = await getItemById('genres', id);
    res.json(foundGenre);
  } catch (error) {
    next(error);
  }
});

genresRouter.put('/:id', async (req, res, next) => {
  const id = req.params.id;
  const body = req.body as CreateGenreDTO;
  if (!body.books || !body.title) {
    next({ message: 'Missing a property in body of the request.' });
    return;
  }

  if (!(typeof body.books === 'object') || body.books.length === 0) {
    next({
      message:
        'books property must be an array of string and must not be empty.',
    });
    return;
  }

  for (const key in body.books) {
    if (typeof body.books[key] !== 'string') {
      next({
        message: 'books property must be an array of string.',
      });
      return;
    }
  }

  try {
    const updatedGenre = await updateItemById('genres', id, body);
    res.json(updatedGenre);
  } catch (error) {
    next(error);
  }
});

genresRouter.delete('/:id', async (req, res, next) => {
  const id = req.params.id;

  try {
    await deleteItemById('genres', id);
    res.json({ message: true });
  } catch (error) {
    next(error);
  }
});
