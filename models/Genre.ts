import mongoose from 'mongoose';
import _ from 'lodash';
import { populateBooks } from './helper/populateBooks';

const GenreSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
});

// Defining a virtual property to look for the genre's books in the bridge table.
GenreSchema.virtual('books', {
  ref: 'BookGenre',
  localField: '_id',
  foreignField: 'genreId',
});

// Since enabling virtuals enables all of them, we need to omit the id field from the output.
GenreSchema.set('toJSON', {
  virtuals: true,
  transform: (_doc, returnedObject) => {
    return _.omit(returnedObject, ['id']);
  },
});

GenreSchema.pre('findOne', populateBooks);
GenreSchema.pre('find', populateBooks);

const GenreModel = mongoose.model('Genre', GenreSchema);
export default GenreModel;
