import mongoose from 'mongoose';
const { Schema } = mongoose;

export interface Donor extends mongoose.Document {
  name: string;
  lastName: string;
  photo1: string;
  photo2: string;
  photo3: string;
  age: string;
  height: string;
  weight: string;
  mobileNumber: string;
  education: string;
  phoneValidation: {
    attempts: number;
    lastAttemptAt: Date;
  };
}

export const DonorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  photo1: {
    type: String,
  },
  photo2: {
    type: String,
  },
  photo3: {
    type: String,
  },
  age: {
    type: String,
    required: true,
  },
  height: {
    type: String,
    required: true,
  },
  weight: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
    index: true,
  },
  education: {
    type: String,
    required: true,
  },

  phoneValidation: {
    type: {
      attempts: {
        type: Number,
        default: 3,
      },
      lastAttemptAt: {
        type: Date,
        default: Date.now,
      },
    },
    default: () => ({
      attempts: 3,
      lastAttemptAt: new Date(),
    }),
  },
});
