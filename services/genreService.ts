import {
  getCollection,
  getItemById,
  createItem,
  updateItemById,
  deleteItemById,
} from '../db/tools';

import { GenreDTO, GenreType } from '../types/genres';

const getAll = async (): Promise<GenreType[]> => {
  const gernes = await getCollection('genres');
  return gernes;
};

const getOne = async (id: string): Promise<GenreType | undefined> => {
  const foundGenre = await getItemById('genres', id);
  return foundGenre;
};

const create = async (genre: GenreDTO): Promise<GenreType> => {
  const newGenre = await createItem('genres', genre);
  return newGenre;
};

const update = async (id: string, genre: GenreDTO): Promise<GenreType> => {
  const updatedGenre = await updateItemById('genres', id, genre);
  return updatedGenre;
};

const remove = async (id: string): Promise<boolean> => {
  await deleteItemById('genres', id);
  return true;
};

export default {
  getAll,
  getOne,
  create,
  update,
  remove,
};
