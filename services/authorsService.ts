import { AuthorType } from '../types/authors';
import Author from '../models/Author';
import { ApiError } from '../errors/ApiError';

const getAll = async () => {
  const authors = await Author.find();
  return authors;
};
const createNewAuthor = async (newAuthor: AuthorType) => {
  const author = new Author(newAuthor);
  await author.save();
  return author;
};

const getById = async (authorId: string) => {
  const author = await Author.findById(authorId);
  if (!author) {
    throw ApiError.resourceNotFound('Author not found');
  }
  return author;
};

const updateById = async (authorId: string, author: AuthorType) => {
  const updatedAuthor = await Author.findByIdAndUpdate(authorId, author);
  if (!author) {
    throw ApiError.resourceNotFound('Author not found');
  }
  return updatedAuthor;
};

const deleteById = async (authorsId: string) => {
  await Author.findByIdAndDelete(authorsId);
};

export default { getAll, createNewAuthor, getById, updateById, deleteById };
