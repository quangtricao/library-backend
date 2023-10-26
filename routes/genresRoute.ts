import express from 'express';

import genreController from '../controllers/genresController';
import { validateId } from '../middlewares/idValidator';
import { validateGenre } from '../middlewares/genreBodyValidate';
import { passThrowsToMiddleware } from '../utils/passThrowsToMiddleware';
import { afterMiddleware } from '../middlewares/afterMiddleware';
export const genresRouter = express.Router();

genresRouter.use('/:id', validateId('genres'));

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

genresRouter.use(afterMiddleware);