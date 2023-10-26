import express from 'express';

import genreController from '../controllers/genresController';
import { genreIdValidate } from '../middlewares/genreIdValidate';
import { validateGenre } from '../middlewares/genreBodyValidate';
import { passThrowsToMiddleware } from '../utils/passThrowsToMiddleware';

export const genresRouter = express.Router();

genresRouter.use('/:id', genreIdValidate);

genresRouter.get('/', passThrowsToMiddleware(genreController.getAllGenre));
genresRouter.get('/:id', passThrowsToMiddleware(genreController.getOneGenre));
genresRouter.post(
  '/',
  validateGenre,
  passThrowsToMiddleware(genreController.createGenre)
);
genresRouter.put(
  '/:id',
  validateGenre,
  passThrowsToMiddleware(genreController.updateGenre)
);
genresRouter.delete(
  '/:id',
  passThrowsToMiddleware(genreController.deleteGenre)
);
