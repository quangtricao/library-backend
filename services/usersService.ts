import { UserDto } from '../types/users';
import UserModel from '../models/User';
import { ApiError } from '../errors/ApiError';
import Book from '../models/Book';

const findAll = async () => {
  const users = await UserModel.find();
  return users;
};

const findOne = async (id: string) => {
  const user = await UserModel.findById(id);
  if (!user) {
    throw ApiError.resourceNotFound('User not found');
  }
  return user;
};

const createOne = async (userDto: UserDto) => {
  const user = await UserModel.create(userDto);
  return user;
};

const updateOne = async (id: string, userDto: UserDto) => {
  const updatedUser = await UserModel.findByIdAndUpdate(id, userDto, { new: true });

  if (!updatedUser) {
    throw ApiError.resourceNotFound('User ID not found');
  }
  return updatedUser;
};

const deleteOne = async (id: string) => {
  const deleteUser = await UserModel.findById(id);
  if (!deleteUser) {
    throw ApiError.resourceNotFound('User ID not found');
  }
  await deleteUser.deleteOne();
};

const borrowBook = async (id: string, isbns: string[]) => {
  const user = await UserModel.findById(id);
  if (!user) {
    throw ApiError.resourceNotFound('User not found.');
  }

  const borrowedIsbns: string[] = [];

  for (const isbn of isbns) {
    const book = await Book.findOne({ isbn: isbn, status: 'available' });
    if (book) {
      const RETURN_DAYS = 30;
      const borrow_Date = new Date();
      const return_Date = new Date();
      return_Date.setDate(borrow_Date.getDate() + RETURN_DAYS);

      user.borrowedBooks.isbn.push(isbn);
      book.borrowerId = user.id;
      book.status = 'borrowed';
      book.borrowDate = borrow_Date;
      book.returnDate = return_Date;
      await user.save();
      await book.save();
      borrowedIsbns.push(isbn);
    }
  }

  return borrowedIsbns;
};
const borrowMultiBooks = async (id: string, isbns: string[]) => {
  const borrowedIsbns = await borrowBook(id, isbns);
  return borrowedIsbns;
};


const returnBook = async (id: string, isbns: string[]): Promise<string[]> => {
  const user = await UserModel.findById(id);
  if (!user) {
    throw ApiError.resourceNotFound('User not found.');
  }

  const returnedIsbns: string[] = [];

  for (const isbn of isbns) {
    const index: number = user.borrowedBooks.isbn.indexOf(isbn);
    if (index === -1) {
      throw ApiError.badRequest('You did not borrow this book.');
    }

    const book = await Book.findOne({ isbn: isbn, status: 'borrowed', borrowerId: id });
    if (!book) {
      throw ApiError.badRequest("This book is not yours to return.");
    }
    
    user.borrowedBooks.isbn = user.borrowedBooks.isbn.filter(item => item !== isbn);

    await user.save();

    await Book.updateOne(
      { _id: book._id },
      { $unset: { borrowerId: 1, borrowDate: 1, returnDate: 1 }, $set: { status: 'available' } }
    );

    returnedIsbns.push(isbn);
  }

  return returnedIsbns;
};

export default {
  findAll,
  findOne,
  createOne,
  updateOne,
  deleteOne,
  borrowBook,
  returnBook,
  borrowMultiBooks,
};
