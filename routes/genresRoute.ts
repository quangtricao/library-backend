import express from 'express';
import genreController from '../controllers/genresController';
import { passThrowsToMiddleware } from '../utils/passThrowsToMiddleware';
import { validateId } from '../middlewares/idValidator';
import { validateGenreDtoInput } from '../middlewares/genresValidate';
import { checkAuth } from '../middlewares/checkAuth';
import { checkAdminRoleOrOwnership } from '../middlewares/checkAdminRoleOrOwnership';

export const genresRouter = express.Router();

genresRouter.use('/:id', validateId);

genresRouter.get('/', passThrowsToMiddleware(genreController.getAllGenre));
genresRouter.get('/:id', passThrowsToMiddleware(genreController.getOneGenre));
genresRouter.get('/:id/books', passThrowsToMiddleware(genreController.getAllBooksByGenre));
genresRouter.post(
  '/',
  checkAuth,
  checkAdminRoleOrOwnership,
  validateGenreDtoInput,
  passThrowsToMiddleware(genreController.createGenre)
);
genresRouter.put(
  '/:id',
  checkAuth,
  checkAdminRoleOrOwnership,
  validateGenreDtoInput,
  passThrowsToMiddleware(genreController.updateGenre)
);
genresRouter.delete('/:id', passThrowsToMiddleware(genreController.deleteGenre));
