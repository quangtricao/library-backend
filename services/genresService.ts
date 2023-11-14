import { GenreDTO } from '../types/genres';
import GenreModel from '../models/Genre';
import { ApiError } from '../errors/ApiError';
import BookGenre from '../models/BookGenre';
import { mapPaginationToMongoose } from '../utils/mongoose';
import { PaginationType } from '../types/pagination';

const getAll = async (title: string, pagination: PaginationType) => {
  const paginationOption = mapPaginationToMongoose(pagination);
  const gernes = await GenreModel.find(
    { title: { $regex: title, $options: 'i' } },
    {},
    paginationOption
  );
  return gernes;
};

const getOne = async (id: string) => {
  const genre = await GenreModel.findById(id);
  if (!genre) {
    throw ApiError.resourceNotFound('Genre not exits');
  }
  return genre;
};

const getAllBooks = async (id: string) => {
  const genre = await GenreModel.findById(id);
  if (!genre) {
    throw ApiError.resourceNotFound('Genre not exits');
  }
  const bookGenres = await BookGenre.find({ genreId: genre._id }).populate({
    path: 'bookId',
    model: 'Book',
  });

  const books = bookGenres.map((bookGenre) => bookGenre.bookId);
  return books;
};

const create = async (genre: GenreDTO) => {
  const newGenre = new GenreModel(genre);
  const savedGenre = await newGenre.save();
  return savedGenre;
};

const update = async (id: string, genre: GenreDTO) => {
  // By default, findByIdAndUpdate will return the document before the update was applied.
  const updatedGenre = await GenreModel.findByIdAndUpdate(id, genre, {
    returnDocument: 'after',
  });
  if (!updatedGenre) {
    throw ApiError.resourceNotFound('Genre not exits');
  }
  return updatedGenre;
};

const remove = async (id: string) => {
  await GenreModel.findByIdAndDelete(id);
  await BookGenre.deleteMany({ genreId: id });
};

export default { getAll, getOne, getAllBooks, create, update, remove };
