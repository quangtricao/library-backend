import {
  getCollection,
  createItem,
  updateItemById,
  deleteItemById,
  getItemById,
} from '../db/tools';
import { AuthorType } from '../types/authors';

export const getAll = async () => {
  const authors = await getCollection('authors');
  return authors;
};
export const createNewAuthor = async (newAuthor: AuthorType) => {
  await createItem('authors', newAuthor);
  return newAuthor;
};

export const getById = async (authorId: string) => {
  const author = await getItemById('authors', authorId);
  return author;
};

export const updateById = async (authorId: string, author: AuthorType) => {
  const updatedAuthor = await updateItemById('authors', authorId, author);
  return updatedAuthor;
};

export const deleteById = async (authorsId: string) => {
  await deleteItemById('authors', authorsId);
};
