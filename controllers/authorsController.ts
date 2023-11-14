import { Request, Response } from 'express';
import AuthorsService from '../services/authorsService';
import { AuthorFilters } from '../types/authors';
import { getFindAllAuthorsOptionsFromQuery } from '../utils/authors';

export const getAllAuthors = async (req: Request, res: Response) => {
  const options = await getFindAllAuthorsOptionsFromQuery(req.query);
  const authorName = req.query.name as AuthorFilters;
  const authors = await AuthorsService.getAll(options, authorName);
  res.json(authors);
};

export const getAuthorsBooks = async (req: Request, res: Response) => {
  const id = req.params.id;
  const books = await AuthorsService.getBooksByAuthor(id);
  res.status(200).json(books);
};

export const createAuthor = async (req: Request, res: Response) => {
  const createdAuthor = await AuthorsService.createNewAuthor(req.body);
  res.status(201).json(createdAuthor);
};

export const getAuthorById = async (req: Request, res: Response) => {
  const author = await AuthorsService.getById(req.params.id);
  res.json(author);
};

export const updateAuthor = async (req: Request, res: Response) => {
  const updatedAuthor = await AuthorsService.updateById(req.params.id, req.body);
  res.json(updatedAuthor);
};

export const deleteAuthor = async (req: Request, res: Response) => {
  await AuthorsService.deleteById(req.params.id);
  res.status(204).send();
};
