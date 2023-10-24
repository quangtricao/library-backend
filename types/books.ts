export type BookType = {
  id: string;
  isbn: string;
  title: string;
  image: string;
  authors: string[];
  publisher: string;
  status: 'available' | 'borrowed';
  borrwerId?: string;
  publishedDate: string;
  borrowDate?: string;
  returnDate?: string;
};

export type CreateBookDto = Omit<BookType, 'id'>;
