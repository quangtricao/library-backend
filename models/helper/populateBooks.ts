import mongoose, { Query } from 'mongoose';
import Book from '../Book';
import _ from 'lodash';

// Define it as a function so we can reuse it in multiple pre hooks.
export async function populateBooks<This extends Query<object, object, object, 'find'>>(
  this: This,
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
