import express from 'express';

import genreController from '../controllers/genresController';
import { errorLoggingMiddleware } from '../middlewares/error';
import { genreIdValidate } from '../middlewares/genreIdValidate';
import { validateGenre } from '../middlewares/genreBodyValidate';
import { passThrowsToMiddleware } from '../utils/passThrowsToMiddleware';

export const genresRouter = express.Router();
genresRouter.use(errorLoggingMiddleware);

genresRouter.use('/:id', genreIdValidate);
genresRouter.use('/', validateGenre);

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
