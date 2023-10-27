import z from 'zod';
import { genreSchema } from '../schemas/genre';

export type GenreDTO = z.infer<typeof genreSchema>;
export type GenreType = GenreDTO & { id: string };