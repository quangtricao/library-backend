import { Request, Response } from 'express';
import {
  getAll,
  createNewAuthor,
  getById,
  updateById,
  deleteById,
} from '../services/authorsService';
import { ApiError } from '../errors/ApiError';

export const getAllAuthors = async (_req: Request, res: Response) => {
  const authors = await getAll();
  res.json(authors);
};

export const createAuthor = async (req: Request, res: Response) => {
  const newAuthor = req.body;
  const createdAuthor = await createNewAuthor(newAuthor);
  res.status(201).json(createdAuthor);
};

export const getAuthorById = async (req: Request, res: Response) => {
  const authorId = req.params.id;
  const author = await getById(authorId);

  if (!author) {
    throw ApiError.resourceNotFound('Author not found');
  }
  res.json(author);
};

export const updateAuthor = async (req: Request, res: Response) => {
  const authorId = req.params.id;
  const updatedAuthorData = req.body;
  const updatedAuthor = await updateById(authorId, updatedAuthorData);
  res.json(updatedAuthor);
};

export const deleteAuthor = async (req: Request, res: Response) => {
  const authorId = req.params.id;
  await deleteById(authorId);
  res.status(204).send();
};
