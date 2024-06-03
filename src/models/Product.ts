import mongoose, { Document, Model, Schema } from "mongoose";

export interface IProduct extends Document {
    description: string;
    name: string;
    price: Number;
    stock: Number;
}

const productSchema = new Schema<IProduct>({
    description: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        default: 0
    },
    stock: {
        type: Number,
        default: 0
    }
},
    {
        timestamps: true
    }
);

export default mongoose.model<IProduct>("Product", productSchema);