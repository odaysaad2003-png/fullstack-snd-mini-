import mongoose , {Document , Schema} from "mongoose";
import type {UserRole, UserStatus} from "../auth/auth.types";


export interface IUser extends Document {
    name: string;
    email: string;
    phone?: string;
    password: string;
    role: UserRole;
    status: UserStatus;
    createdAt: Date;
    updatedAt: Date;
}


const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minlength: [2, "Name must be at least 2 characters"],
        maxlength: [60, "Name must be at most 60 characters"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    phone: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        select: false,
    },

       role: {
      type: String,
      enum: ['user', 'admin'] satisfies UserRole[],
      default: 'user',
    },
     status: {
      type: String,
      enum: ['active', 'suspended'] satisfies UserStatus[],
      default: 'active',
    },

},{
    timestamps: true,
  }
);

const User = mongoose.model<IUser>('User',userSchema)
export default User