import mongoose, { Document } from 'mongoose';

export type UserType = Document & {
  
  username: string;
  role: 'user' | 'admin';
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
};

const userSchema = new mongoose.Schema<UserType>({

  username: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v: string) => {
        // Simple URL validation
        const urlRegex = /^(https?):\/\/([^\s$.?#].[^\s]*)$/i;
        return urlRegex.test(v);
      },
      message: 'Invalid URL format',
    },
  },
});

const userModel = mongoose.model<UserType>('User', userSchema);

export default userModel;
