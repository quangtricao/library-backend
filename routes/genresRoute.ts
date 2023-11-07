import express from 'express';
import genreController from '../controllers/genresController';
import { validateGenre } from '../middlewares/genreBodyValidate';
import { passThrowsToMiddleware } from '../utils/passThrowsToMiddleware';
import { validateId } from '../middlewares/idValidator';

export const genresRouter = express.Router();

genresRouter.get('/', passThrowsToMiddleware(genreController.getAllGenre));
genresRouter.get('/:id', validateId, passThrowsToMiddleware(genreController.getOneGenre));
genresRouter.post('/', validateGenre, passThrowsToMiddleware(genreController.createGenre));
genresRouter.put(
  '/:id',
  validateId,
  validateGenre,
  passThrowsToMiddleware(genreController.updateGenre)
);
genresRouter.delete('/:id', validateId, passThrowsToMiddleware(genreController.deleteGenre));
