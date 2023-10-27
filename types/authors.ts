import { z } from 'zod';
import { AuthorDtoSchema } from '../schemas/authors';

export type AuthorDto = z.infer<typeof AuthorDtoSchema>;
export type AuthorType = z.mergeTypes<{ id: string }, AuthorDto>;
