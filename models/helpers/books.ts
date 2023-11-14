import Author from '../Author';
import Genre from '../Genre';

export const populateAuthorsOptions = {
  path: 'authors',
  select: 'authorId',
  populate: {
    path: 'authorId',
    model: 'Author',
    select: 'name',
  },
  transform: (doc: { authorId: typeof Author }) => {
    return doc.authorId;
  },
};

export const populateGenresOptions = {
  path: 'genres',
  select: 'genreId',
  populate: {
    path: 'genreId',
    model: 'Genre',
    select: 'title',
  },
  transform: (doc: { genreId: typeof Genre }) => {
    return doc.genreId;
  },
};
