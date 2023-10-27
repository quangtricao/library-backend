import { DatabaseType } from '../types/db';

const getEntityIdNumber = (
  entity: DatabaseType[keyof DatabaseType][0]
): number => {
  const id = entity.id;
  const idNumber = parseInt(id.split('-')[1]);
  return idNumber;
};

/**
 * Generates a new id for a new iterm in a collection.
 * If the id already exists, it will increment the number at the end of the id.
 * It uses recursion to do so, so it will keep incrementing until it finds an id that doesn't exist.
 */
export const generateNewId = (
  key: keyof DatabaseType,
  collection: DatabaseType[typeof key]
): string => {
  if (collection.length === 0) {
    return `${key}-1`;
  }
  const entityIdNumbers = collection.map(getEntityIdNumber);
  const maxIdNumber = Math.max(...entityIdNumbers);
  return `${key}-${maxIdNumber + 1}`;
};
