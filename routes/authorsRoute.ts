import express from 'express';

import {
  getAllAuthors,
  createAuthor,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
  getAuthorsBooks,
} from '../controllers/authorsController';
import { errorLoggingMiddleware } from '../middlewares/error';
import { passThrowsToMiddleware } from '../utils/passThrowsToMiddleware';
import authorsValidator from '../middlewares/authorsValidator';

export const authorsRouter = express.Router();
authorsRouter.use(errorLoggingMiddleware);

authorsRouter.get('/', passThrowsToMiddleware(getAllAuthors));
authorsRouter.post('/', authorsValidator.validateAuthorInput, passThrowsToMiddleware(createAuthor));
authorsRouter.get('/:id', authorsValidator.authorIdValidate, passThrowsToMiddleware(getAuthorById));
authorsRouter.put(
  '/:id',
  authorsValidator.validateAuthorInput,
  passThrowsToMiddleware(updateAuthor)
);
authorsRouter.delete(
  '/:id',
  authorsValidator.authorIdValidate,
  passThrowsToMiddleware(deleteAuthor)
);
authorsRouter.get(
  '/:id/books',
  authorsValidator.authorIdValidate,
  passThrowsToMiddleware(getAuthorsBooks)
);
