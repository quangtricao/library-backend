import express from 'express';

import genreController from '../controllers/genreController';
import { errorLoggingMiddleware } from '../middlewares/error';
import { genreIdValidate } from '../middlewares/genreIdValidate';
import { validateGenre } from '../middlewares/genreBodyValidate';

export const genresRouter = express.Router();
genresRouter.use(errorLoggingMiddleware);
genresRouter.use('/:id', genreIdValidate);

genresRouter.get('/', genreController.getAllGenre);
genresRouter.get('/:id', genreController.getOneGenre);
genresRouter.post('/', validateGenre, genreController.createGenre);
genresRouter.put('/:id', validateGenre, genreController.updateGenre);
genresRouter.delete('/:id', genreController.deleteGenre);
