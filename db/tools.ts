import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { DatabaseType } from '../types/db';

const DB_FILE_NAME = 'data.json';

export const getDbPath = (): string => {
  const __dirname = path.resolve();
  return path.join(__dirname, DB_FILE_NAME);
};

export const readDb = async (): Promise<DatabaseType> => {
  const dbPath = getDbPath();
  const db = await readFile(dbPath, 'utf-8');
  return JSON.parse(db);
};

export const writeDb = async (db: DatabaseType): Promise<void> => {
  const dbPath = getDbPath();
  await writeFile(dbPath, JSON.stringify(db));
};
