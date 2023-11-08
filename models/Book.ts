import mongoose from 'mongoose';
import dayjs, { ManipulateType } from 'dayjs';

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

      /**
       * Lend set of books to the given user.
       *
       * @param bookIds - The set of book ids to lend.
       * @param userId - Lender id.
       * @param lendAmount - (Optional) The amount of time to lend the books for.
       * @param lendPeriod - (Optional) The period of time to lend the books for.
       *
       * @returns - The array of book ids that were lended.
       */
      borrow: async function (
        bookIds: string[],
        userId: string,
        lendAmount: number = 7,
        lendPeriod: ManipulateType = 'day'
      ) {
        // Because updateMany does not have an 'affected rows' equivalent, we have to get the available books from the set first.
        const borrowedBooks = await this.find({
          _id: { $in: bookIds },
          status: 'available',
        }).select('_id');

        const borrowedBookIds = borrowedBooks.map((book) => book._id);

        if (borrowedBookIds.length === 0) {
          return [];
        }

        const borrowAt = dayjs();
        const returnAt = borrowAt.add(lendAmount, lendPeriod);

        await this.updateMany(
          { _id: { $in: borrowedBookIds } },
          {
            $set: {
              status: 'borrowed',
              borrowerId: userId,
              borrowDate: borrowAt.toDate(),
              returnDate: returnAt.toDate(),
            },
          }
        );

        return borrowedBookIds;
      },

      /**
       * Return set of books lended by the given user.
       *
       * @param bookIds - The set of book ids to return.
       * @param userId - Borrower id.
       *
       * @returns - The array of book ids that were returned.
       */
      return: async function (bookIds: string[], userId: string) {
        // Check if the books are borrowed by the user
        const returnedBooks = await this.find({
          _id: { $in: bookIds },
          status: 'borrowed',
          borrowerId: userId,
        }).select('_id');
        const returnedBookIds = returnedBooks.map((book) => book._id);

        if (returnedBookIds.length === 0) {
          return [];
        }

        await this.updateMany(
          { _id: { $in: returnedBookIds } },
          { $set: { status: 'available' }, $unset: { borrowerId: 1, borrowDate: 1, returnDate: 1 } }
        );

        return returnedBookIds;
      },
    },
  }
);

export default mongoose.model('Book', BookSchema);
