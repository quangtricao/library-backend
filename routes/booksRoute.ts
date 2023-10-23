import express from 'express';

export const booksRouter = express.Router();

booksRouter.get('/', (_req, res) => {
  res.send('📚');
});
