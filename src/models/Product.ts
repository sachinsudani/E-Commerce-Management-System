import mongoose, { Document, Schema, Types } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: Number;
  images: string[];
  category: Types.ObjectId;
}
const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    images: {
      type: [String],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IProduct>("Product", productSchema);
