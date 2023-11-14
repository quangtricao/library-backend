import { Request, Response } from 'express';

import genreService from '../services/genresService';
import { GenreDTO } from '../types/genres';
import { getPaginationOptionsFromQuery } from '../utils/pagination';
import { getTitleFromQuery } from '../utils/genres';

const getAllGenre = async (req: Request, res: Response) => {
  const title = (await getTitleFromQuery(req.query)).title;
  const pagination = await getPaginationOptionsFromQuery(req.query);

  const genreInDB = await genreService.getAll(title, pagination);
  res.status(200).json(genreInDB);
};

const getOneGenre = async (req: Request, res: Response) => {
  const id = req.params.id;
  const foundGenre = await genreService.getOne(id);
  res.status(200).json(foundGenre);
};

const getAllBooksByGenre = async (req: Request, res: Response) => {
  const id = req.params.id;
  const allBooks = await genreService.getAllBooks(id);
  res.status(200).json(allBooks);
};

const createGenre = async (req: Request, res: Response) => {
  const body = req.body as GenreDTO;

  const newGenre = await genreService.create(body);
  res.status(201).json(newGenre);
};

const updateGenre = async (req: Request, res: Response) => {
  const id = req.params.id;
  const body = req.body as GenreDTO;

  const updatedGenre = await genreService.update(id, body);
  res.status(200).json(updatedGenre);
};

const deleteGenre = async (req: Request, res: Response) => {
  const id = req.params.id;

  await genreService.remove(id);
  res.status(204).end();
};

export default {
  getAllGenre,
  getOneGenre,
  getAllBooksByGenre,
  createGenre,
  updateGenre,
  deleteGenre,
};
