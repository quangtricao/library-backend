import express from 'express';
import genreController from '../controllers/genresController';
import { validateGenreDtoInput } from '../middlewares/genresValidate';
import { passThrowsToMiddleware } from '../utils/passThrowsToMiddleware';
import { validateId } from '../middlewares/idValidator';

export const genresRouter = express.Router();

genresRouter.use('/:id', validateId);

genresRouter.get('/', passThrowsToMiddleware(genreController.getAllGenre));
genresRouter.get('/:id', passThrowsToMiddleware(genreController.getOneGenre));
genresRouter.get('/:id/books', passThrowsToMiddleware(genreController.getAllBooksByGenre));
genresRouter.post(
  '/',
  validateGenreDtoInput,
  passThrowsToMiddleware(genreController.createGenre)
);
genresRouter.put(
  '/:id',
  validateGenreDtoInput,
  passThrowsToMiddleware(genreController.updateGenre)
);
genresRouter.delete('/:id', passThrowsToMiddleware(genreController.deleteGenre));