import mongoose from 'mongoose';

const GenreSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  books: [String], // Will refactor to use bridge
});

const GenreModel = mongoose.model('Genre', GenreSchema);
export default GenreModel;
