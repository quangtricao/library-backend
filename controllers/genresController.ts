import { NextFunction, Request, Response } from 'express';

import genreService from '../services/genreService';
import { GenreDTO } from '../types/genres';
import { ApiError } from '../errors/ApiError';

const getAllGenre = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  const genreInDB = await genreService.getAll();
  res.status(200).json(genreInDB);
  next();
};

const getOneGenre = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const foundGenre = await genreService.getOne(id);
  if (!foundGenre) {
    throw ApiError.resourceNotFound('Genre not exits');
  }
  res.status(200).json(foundGenre);
  next();
};

const createGenre = async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body as GenreDTO;

  const newGenre = await genreService.create(body);
  res.status(201).json(newGenre);
  next();
};

const updateGenre = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const body = req.body as GenreDTO;

  const updatedGenre = await genreService.update(id, body);
  res.status(200).json(updatedGenre);
  next();
};

const deleteGenre = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  await genreService.remove(id);
  res.status(204).end();
  next();
};

export default {
  getAllGenre,
  getOneGenre,
  createGenre,
  updateGenre,
  deleteGenre,
};
