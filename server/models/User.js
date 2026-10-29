import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
      type: String,
      minLenght: 3,
      required: true,
      select: false,
    },
    location: { type: String, trim: true },
    description: { type: String, trim: true },
    occupation: { type: String, trim: true },
  },
  { timestamps: true },
);

export default mongoose.model('User', userSchema);
