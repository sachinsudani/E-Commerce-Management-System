import mongoose, { Document, Model, Schema } from "mongoose";

const ROLE = ["USER", "ADMIN"];

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    role: string;
    resetPasswordToken?: string;
    resetPasswordExpires?: Date;
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "password must be character."]
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    role: {
        type: String,
        enum: ROLE,
        default: "USER",
        required: true
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
},
    {
        timestamps: true
    }
);

export default mongoose.model<IUser>("User", userSchema);