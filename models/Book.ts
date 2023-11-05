import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const BookSchema = new Schema(
  {
    isbn: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
      index: true,
    },
    publisher: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    publishedDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ['available', 'borrowed'],
      default: 'available',
    },
    borrowerId: {
      type: ObjectId,
      ref: 'User',
    },
    borrowDate: {
      type: Date,
    },
    returnDate: {
      type: Date,
    },
  },
  {
    statics: {
      findByIsbn: function (isbn: string) {
        return this.findOne({ isbn });
      },
    },
  }
);

export default mongoose.model('Book', BookSchema);
