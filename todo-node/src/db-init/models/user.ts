import bcrypt from "bcrypt";
import mongoose, { Model } from "mongoose";

export type TUserSchemaRole = 'user' | 'admin';

export interface IUserSchema extends mongoose.Document {
  username: string;
  password: string;
  role: TUserSchemaRole;
  createdAt: Date;
  updatedAt: Date;
}

const USER_SCHEMA_ROLE_ENUM: TUserSchemaRole[] = ['user', 'admin'];
const USER_SCHEMA_DEFAULT_ROLE: TUserSchemaRole = 'user';

const userSchema: mongoose.Schema<IUserSchema> = new mongoose.Schema<IUserSchema>({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: USER_SCHEMA_ROLE_ENUM,
    default: USER_SCHEMA_DEFAULT_ROLE
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  updatedAt: {
    type: Date,
    default: new Date()
  },
});

userSchema.pre('save', async function(next) {
  try {
    // this condition checks if password field is modified or not, if password is not modified then it skips the un-necessary hashing
    // if (!this.isModified('password')) {
    //   return next();
    // }
    // Hash the password and assign it back to the field
    // const hashedPassword = await bcrypt.hash(this.password, 10);
    // this.password = hashedPassword;
    next();
  } catch (error: any) {
    next(error);
  }
});

userSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});


// mongoose.model('1st', 2nd, '3rd')
// 1st --> name for mongoose, can be used for ref in other models
// 2nd --> schema of the model
// 3rd --> custom name for the model stored inside mongoDB, by default it stores as (1st param + 's') User --> users
export const User: Model<IUserSchema> = mongoose.model('User', userSchema, 'users_collection');
