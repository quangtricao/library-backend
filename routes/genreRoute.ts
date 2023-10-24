import express from 'express';

import {
  getCollection,
  setCollection,
  updateItemById,
  deleteItemById,
} from '../db/tools';

export const genresRouter = express.Router();

genresRouter.get('/', async (_req, res) => {
  const genreInDB = await getCollection('genres');
  res.json(genreInDB);
});

genresRouter.post('/', async (req, res) => {
  const body = req.body;
  const genreInDB = await getCollection('genres');

  const lastID = genreInDB[genreInDB.length - 1]
    ? genreInDB[genreInDB.length - 1].id
    : 'genre-1';

  const id = lastID.split('-')[1];

  genreInDB.push({ id: `genre-${Number(id) + 1}`, ...body });
  await setCollection('genres', genreInDB);
  res.json(genreInDB);
});

genresRouter.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  const genreInDB = await getCollection('genres');

  const foundGenre = genreInDB.find((genre) => genre.id === id);

  if (!foundGenre) {
    next('Genre not exists');
    return;
  }

  res.json(foundGenre);
});

genresRouter.put('/:id', async (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  let genreInDB = await getCollection('genres');

  const foundGenre = genreInDB.find((genre) => genre.id === id);

  if (!foundGenre) {
    next('Genre not exists');
    return;
  }

  await updateItemById('genres', foundGenre.id, body);
  genreInDB = await getCollection('genres');
  const updatedGenre = genreInDB.find((genre) => genre.id === id);
  res.json(updatedGenre);
});

genresRouter.delete('/:id', async (req, res, next) => {
  const id = req.params.id;
  const genreInDB = await getCollection('genres');

  const genreToBeDeleted = genreInDB.find((genre) => genre.id === id);

  if (!genreToBeDeleted) {
    next('Genre not exists');
    return;
  }

  await deleteItemById('genres', genreToBeDeleted.id);
  res.json({ message: true });
});
