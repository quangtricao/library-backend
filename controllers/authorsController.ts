import { Request, Response } from 'express';
import AuthorsServices from '../services/authorsService';

export const getAllAuthors = async (_req: Request, res: Response) => {
  const authors = await AuthorsServices.getAll();
  res.json(authors);
};

export const createAuthor = async (req: Request, res: Response) => {
  const createdAuthor = await AuthorsServices.createNewAuthor(req.body);
  res.status(201).json(createdAuthor);
};

export const getAuthorById = async (req: Request, res: Response) => {
  const author = await AuthorsServices.getById(req.params.id);
  res.json(author);
};

export const updateAuthor = async (req: Request, res: Response) => {
  const updatedAuthor = await AuthorsServices.updateById(req.params.id, req.body);
  res.json(updatedAuthor);
};

export const deleteAuthor = async (req: Request, res: Response) => {
  await AuthorsServices.deleteById(req.params.id);
  res.status(204).send();
};
