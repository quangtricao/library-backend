import _ from 'lodash';
import { DatabaseType } from '../types/db';

/**
 * Generates a new id for a new iterm in a collection.
 * If the id already exists, it will increment the number at the end of the id.
 * It uses recursion to do so, so it will keep incrementing until it finds an id that doesn't exist.
 */
export const generateNewId = (
  key: keyof DatabaseType,
  collection: DatabaseType[typeof key],
  iteration: number = 0
): string => {
  const lastElement = _.last(collection);
  if (!lastElement) return `${key}-1`;
  const lastElementId = _.last(lastElement.id.split('-'));
  const newIdNumber = Number(lastElementId) + 1 + iteration;
  const newId = `${key}-${newIdNumber}`;
  const idAlreadyExists = _.find(collection, { id: newId });
  if (idAlreadyExists) return generateNewId(key, collection, iteration + 1);
  return newId;
};
