export type GenreType = {
  id: string;
  title: string;
  books: string[];
  // images: string;
};

export type CreateGenreDTO = Omit<GenreType, 'id'>;
