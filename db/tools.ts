import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { CollectionType, DatabaseType } from '../types/db';
import _ from 'lodash';
import { generateNewId } from '../utils/generateNewId';

const DB_FILE_NAME = 'data.json';

export const getDbPath = (): string => {
  const __dirname = path.resolve();
  return path.join(__dirname, DB_FILE_NAME);
};

/**
 * Reads the database file and returns the parsed JSON.
 * @returns Promise resolving to the parsed JSON.
 */
export const readDb = async (): Promise<DatabaseType> => {
  const dbPath = getDbPath();
  const db = await readFile(dbPath, 'utf-8');
  return JSON.parse(db);
};

/**
 * Writes provided data to the database file.
 * @param data The data to write to the database file.
 *
 * @returns Promise resolving to void.
 */
export const writeDb = async (data: DatabaseType): Promise<void> => {
  const dbPath = getDbPath();
  await writeFile(dbPath, JSON.stringify(data));
};

/**
 * Gets a collection from the database.
 * @param key The key of the collection to get. "books" | "authors" | "genres" | "users"
 * @returns The collection of items
 */
export const getCollection = async <T extends keyof CollectionType>(
  key: T
): Promise<DatabaseType[T]> => {
  const db = await readDb();
  return db[key];
};

/**
 * Sets a collection in the database.
 * @param key The key of the collection to set. "books" | "authors" | "genres" | "users"
 * @param items The collection of items to set.
 */
export const setCollection = async <T extends keyof CollectionType>(
  key: T,
  items: DatabaseType[T]
): Promise<void> => {
  const db = await readDb();
  const newState = { ...db, [key]: items };
  await writeDb(newState);
};

/**
 * Creates a new item in the database collection specified by the key.
 * Generates a new id for the item and returns the new item with the id.
 *
 * @param key The key of the collection to create the item in. "books" | "authors" | "genres" | "users"
 * @param itemDto The item to create (Dto stands for Data Transfer Object – basically the item instance without the id property).
 * @returns Promise resolving to the new item with the generated id.
 */
export const createItem = async <T extends keyof CollectionType>(
  key: T,
  itemDto: Omit<DatabaseType[T][0], 'id'>
): Promise<DatabaseType[T][0]> => {
  const collection = await getCollection(key);
  const newId = generateNewId(key, collection);
  const newItem = { ...itemDto, id: newId };
  const newCollection = [...collection, newItem];
  await setCollection(key, newCollection as DatabaseType[T]);
  return newItem;
};

/**
 * Gets an item from the database collection specified by the key. The item is identified by the id.
 *
 * @param key The key of the collection to create the item in. "books" | "authors" | "genres" | "users"
 * @param id The id of the item to get.
 * @returns Promise resolving to the item if found, otherwise undefined.
 */
export const getItemById = async <T extends keyof CollectionType>(
  key: T,
  id: string
): Promise<DatabaseType[T][0] | undefined> => {
  const collection = await getCollection(key);
  const index = collection.findIndex((item) => item.id === id);
  if (index === -1) throw new Error(`No item with id ${id} found`);
  return collection.find((item) => item.id === id);
};

/**
 * Updates an item in the database collection specified by the key. The item is identified by the id.
 * Returns the updated item.
 *
 * @throws Error if no item with the id is found.
 * @param key The key of the collection to create the item in. "books" | "authors" | "genres" | "users"
 * @param id The id of the item to update.
 * @param itemData Partial data of the item to update.
 * @returns Promise resolving to the updated item.
 */
export const updateItemById = async <T extends keyof CollectionType>(
  key: T,
  id: string,
  itemData: Partial<Omit<DatabaseType[T][0], 'id'>>
): Promise<DatabaseType[T][0]> => {
  const collection = await getCollection(key);
  const index = collection.findIndex((item) => item.id === id);
  if (index === -1) throw new Error(`No item with id ${id} found`);
  const newItem = { ...collection[index], ...itemData };
  collection[index] = newItem;
  await setCollection(key, collection as DatabaseType[T]);
  return newItem;
};

/**
 * Deletes an item in the database collection specified by the key. The item is identified by the id.
 *
 * @key The key of the collection to create the item in. "books" | "authors" | "genres" | "users"
 * @id The id of the item to delete.
 * @throws Error if no item with the id is found.
 */
export const deleteItemById = async <T extends keyof CollectionType>(
  key: T,
  id: string
): Promise<void> => {
  const collection = await getCollection(key);
  const index = collection.findIndex((item) => item.id === id);
  if (index === -1) throw new Error(`No item with id ${id} found`);
  const newCollection = _.cloneDeep(collection);
  newCollection.splice(index, 1);
  await setCollection(key, newCollection as DatabaseType[T]);
};
