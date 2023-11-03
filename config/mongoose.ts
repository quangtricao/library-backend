import mongoose from 'mongoose';

const { DB_URL } = process.env;
export const connectMongoDB = () =>
  mongoose.connect(DB_URL as string).then(() => console.log('Successfully connected to MongoDB.'));
