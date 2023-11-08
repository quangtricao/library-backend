import mongoose from 'mongoose';
import Book from './Book';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import BookAuthor from './BookAuthor';

const Schema = mongoose.Schema;

const authorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);
authorSchema.virtual('books', {
  ref: 'BookAuthor',
  localField: '_id',
  foreignField: 'author',
});
authorSchema.pre('find', async function (next) {
  this.populate({
    path: 'books',
    select: 'book  -_id  -author',
    populate: {
      path: 'book',
      model: 'Book',
      select: 'title',
    },
    transform: (doc: { book: typeof Book }) => {
      return doc.book;
    },
  });
  next();
});

const Author = mongoose.model('Author', authorSchema);

export default Author;
