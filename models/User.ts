import mongoose, { Document } from 'mongoose';
import { Role, role } from '../types/users'; 

export type UserTypes = Document & {
  username: string;
  role: Role;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
};

const UserSchema = new mongoose.Schema<UserTypes>({
  username: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: [role.USER, role.ADMIN],
    default: role.USER, 
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

const UserModel = mongoose.model<UserTypes>('User', UserSchema);

export default UserModel;
