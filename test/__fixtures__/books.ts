import { BookDto } from '../../types/books';

const booksFixture: BookDto[] = [
  {
    isbn: '978-3-16-14',
    image: 'https://images.com/lotr.png',
    title: 'The Lord of the Rings',
    publisher: 'George Allen & Unwin',
    publishedYear: 1954,
    status: 'available',
  },
  {
    isbn: '978-3-16-15',
    image: 'https://images.com/lotr.png',
    title: 'The Lord of the Rings 2',
    publisher: 'George Allen & Unwin',
    publishedYear: 1954,
    status: 'available',
  },
];

export default booksFixture;
