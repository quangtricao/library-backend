import express from 'express';

import genreController from '../controllers/genreController';
import { errorLoggingMiddleware } from '../middlewares/error';
import { validateIdMiddleware } from '../middlewares/idValidate';
import { genreBodyValidate } from '../middlewares/genreBodyValidate';

export const genresRouter = express.Router();
genresRouter.use(errorLoggingMiddleware);
genresRouter.use('/:id', validateIdMiddleware);

genresRouter.get('/', genreController.getAllGenre);
genresRouter.get('/:id', genreController.getOneGenre);
genresRouter.post('/', genreBodyValidate, genreController.createGenre);
genresRouter.put('/:id', genreBodyValidate, genreController.updateGenre);
genresRouter.delete('/:id', genreController.deleteGenre);
