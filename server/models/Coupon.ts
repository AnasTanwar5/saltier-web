import mongoose, { Schema, Document } from 'mongoose';

export interface IOrderItem {
  appetizer: {
    id: string;
    name: string;
    description: string;
    price: number;
    image?: string;
  };
  quantity: number;
}

export interface ICoupon extends Document {
  code: string;
  items: IOrderItem[];
  userType?: "student" | "staff";
  userName?: string;
  rollNo?: string;
  email?: string;
  createdAt: Date;
}

const OrderItemSchema: Schema = new Schema({
  appetizer: {
    id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, default: '' },
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1'],
  },
}, { _id: false });

const CouponSchema: Schema = new Schema({
  code: {
    type: String,
    required: [true, 'Please provide a coupon code'],
    unique: true,
    trim: true,
    uppercase: true,
  },
  items: {
    type: [OrderItemSchema],
    required: true,
    validate: {
      validator: (items: IOrderItem[]) => items.length > 0,
      message: 'Coupon must have at least one item',
    },
  },
  userType: {
    type: String,
    enum: ["student", "staff"],
    default: undefined,
  },
  userName: {
    type: String,
    default: "",
  },
  rollNo: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

export default mongoose.model<ICoupon>('Coupon', CouponSchema);


