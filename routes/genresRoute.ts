import express from 'express';
import genreController from '../controllers/genresController';
import genresValidator from '../middlewares/genresValidator';
import { passThrowsToMiddleware } from '../utils/passThrowsToMiddleware';
import { validateId } from '../middlewares/idValidator';
import { checkAuth } from '../middlewares/checkAuth';
import { checkAdminRoleOrOwnership } from '../middlewares/checkAdminRoleOrOwnership';

export const genresRouter = express.Router();

genresRouter.use('/:id', validateId);

genresRouter.get(
  '/',
  genresValidator.validateGenreParamQuery,
  passThrowsToMiddleware(genreController.getAllGenre)
);
genresRouter.get('/:id', passThrowsToMiddleware(genreController.getOneGenre));
genresRouter.get('/:id/books', passThrowsToMiddleware(genreController.getAllBooksByGenre));
genresRouter.post(
  '/',
  checkAuth,
  checkAdminRoleOrOwnership,
  genresValidator.validateGenreDtoInput,
  passThrowsToMiddleware(genreController.createGenre)
);
genresRouter.put(
  '/:id',
  checkAuth,
  checkAdminRoleOrOwnership,
  genresValidator.validateGenreDtoInput,
  passThrowsToMiddleware(genreController.updateGenre)
);
genresRouter.delete(
  '/:id',
  checkAuth,
  checkAdminRoleOrOwnership,
  passThrowsToMiddleware(genreController.deleteGenre)
);
