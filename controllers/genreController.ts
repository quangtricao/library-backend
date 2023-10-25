import { Request, Response, NextFunction } from 'express';

import genreService from '../services/genreService';
import { CreateGenreDTO } from '../types/genres';

const getAllGenre = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const genreInDB = await genreService.getAll();
    res.json(genreInDB);
  } catch (error) {
    next(error);
  }
};

const getOneGenre = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  try {
    const foundGenre = await genreService.getOne(id);
    res.json(foundGenre);
  } catch (error) {
    next(error);
  }
};

const createGenre = async (req: Request, res: Response, next: NextFunction) => {
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
    const newGenre = await genreService.create(body);
    res.json(newGenre);
  } catch (error) {
    next(error);
  }
};

const updateGenre = async (req: Request, res: Response, next: NextFunction) => {
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
    const updatedGenre = await genreService.update(id, body);
    res.json(updatedGenre);
  } catch (error) {
    next(error);
  }
};

const deleteGenre = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  try {
    await genreService.remove(id);
    res.json({ message: true });
  } catch (error) {
    next(error);
  }
};

export default {
  getAllGenre,
  getOneGenre,
  createGenre,
  updateGenre,
  deleteGenre,
};
