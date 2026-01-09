import mongoose, { Schema, Document } from 'mongoose';

export interface IAppetizer extends Document {
  name: string;
  description: string;
  price: number;
  image?: string;
}

const AppetizerSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
    min: [0, 'Price must be positive'],
  },
  image: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

export default mongoose.model<IAppetizer>('Appetizer', AppetizerSchema);

