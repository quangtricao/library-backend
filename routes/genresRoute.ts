import express from 'express';

import genreController from '../controllers/genreController';
import { errorLoggingMiddleware } from '../middlewares/error';
import { validateIdMiddleware } from '../middlewares/validateId';

export const genresRouter = express.Router();
genresRouter.use(errorLoggingMiddleware);
genresRouter.use('/:id', validateIdMiddleware);

genresRouter.get('/', genreController.getAllGenre);
genresRouter.get('/:id', genreController.getOneGenre);
genresRouter.post('/', genreController.createGenre);
genresRouter.put('/:id', genreController.updateGenre);
genresRouter.delete('/:id', genreController.deleteGenre);
