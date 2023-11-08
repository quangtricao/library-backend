import mongoose, { Schema } from 'mongoose';

const bookAuthorSchema = new Schema({
  book: { type: Schema.ObjectId, ref: 'Book' },
  author: { type: Schema.ObjectId, ref: 'Author' },
});

bookAuthorSchema.index({ book: 1, author: 1 }, { unique: true });
const BookAuthor = mongoose.model('BookAuthor', bookAuthorSchema);

export default BookAuthor;
