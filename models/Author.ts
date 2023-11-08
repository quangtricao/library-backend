import mongoose from 'mongoose';
import Book from './Book';
import _ from 'lodash';

const Schema = mongoose.Schema;

const authorSchema = new Schema({
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
});

// Defining a virtual property to look for the author's books in the bridge table.
authorSchema.virtual('books', {
  ref: 'BookAuthor',
  localField: '_id',
  foreignField: 'authorId',
});

// Since enabling virtuals enables all of them, we need to omit the id field from the output.
// Thanks to Tri for the tip!
authorSchema.set('toJSON', {
  virtuals: true,
  transform: (_doc, returnedObject) => {
    return _.omit(returnedObject, ['id']);
  },
});

// Define it as a function so we can reuse it in multiple pre hooks.
async function populateBooks(
  this: mongoose.Query<any, any, {}, any, 'find'>,
  next: mongoose.CallbackWithoutResultAndOptionalError
) {
  // Because our initial virtual field only populates the content of the bridge table, we need to query Book to get the actual book data.
  this.populate({
    path: 'books', // The virtual field on our authorSchema.
    select: 'bookId', // The field on the bridge table that contains the book's id.
    populate: {
      path: 'bookId', // The field on the bridge table that contains the book's id. (Yes, the same as above.)
      model: 'Book', // The model to use for populating the field.
      select: 'title', // The field on the Book model to select. _id is always selected.
    },
    // And here we're flattening the output, so instead of this:
    // books: [{bookId: {title, _id}}],
    // we get this:
    // books: [{title: 'Book Title'}]
    transform: (doc: { bookId: typeof Book }) => {
      return doc.bookId;
    },
  });
  next();
}

authorSchema.pre('findOne', populateBooks);
authorSchema.pre('find', populateBooks);

const Author = mongoose.model('Author', authorSchema);

export default Author;
