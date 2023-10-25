import { deleteBookByIsbn, getBookByIsbn, updateBookByIsbn } from '../db/books';
import { createItem, getCollection } from '../db/tools';
import { BookDto } from '../types/books';

async function findAll() {
  const books = await getCollection('books');
  return books;
}

async function findOne(isbn: string) {
  const book = await getBookByIsbn(isbn);
  return book;
}

async function createOne(bookDto: BookDto) {
  const newBook = await createItem('books', bookDto);
  return newBook;
}

async function updateOne(isbn: string, bookDto: BookDto) {
  const updatedBook = await updateBookByIsbn(isbn, bookDto);
  return updatedBook;
}

async function deleteOne(isbn: string) {
  await deleteBookByIsbn(isbn);
}

export default {
  findAll,
  findOne,
  createOne,
  updateOne,
  deleteOne,
};
