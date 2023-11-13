import { AuthorDto } from '../types/authors';
import Author from '../models/Author';
import { ApiError } from '../errors/ApiError';
import BookAuthor from '../models/BookAuthor';

const getAll = async () => {
  const authors = await Author.find();
  return authors;
};
const getBooksByAuthor = async (authorId: string) => {
  const author = await Author.findById(authorId);
  if (!author) {
    throw ApiError.resourceNotFound('Author not exits');
  }
  const bookAuthor = await BookAuthor.find({ authorId: author._id }).populate({
    path: 'bookId',
    model: 'Book',
  });

  const books = bookAuthor.map((bookAuthor) => bookAuthor.bookId);
  return books;
};

const createNewAuthor = async (newAuthor: AuthorDto) => {
  const author = Author.create(newAuthor);
  return author;
};

const getById = async (authorId: string) => {
  const author = await Author.findById(authorId);
  if (!author) {
    throw ApiError.resourceNotFound('Author not found');
  }
  return author;
};

const updateById = async (authorId: string, author: AuthorDto) => {
  const updatedAuthor = await Author.findByIdAndUpdate(authorId, author);
  if (!author) {
    throw ApiError.resourceNotFound('Author not found');
  }
  return updatedAuthor;
};

const deleteById = async (authorsId: string) => {
  await Author.findByIdAndDelete(authorsId);
};

export default { getAll, createNewAuthor, getById, updateById, deleteById, getBooksByAuthor };
