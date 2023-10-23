import { AuthorType } from './authors';
import { BookType } from './books';
import { GenreType } from './genres';
import { UserType } from './users';

export type DatabaseType = {
  users: UserType[];
  books: BookType[];
  genres: GenreType[];
  authors: AuthorType[];
};
