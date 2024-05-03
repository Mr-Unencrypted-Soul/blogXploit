import mongoose, { Model } from "mongoose";

export interface IBlogSchema extends mongoose.Document {
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

const blogSchema: mongoose.Schema<IBlogSchema> = new mongoose.Schema<IBlogSchema>({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  updatedAt: {
    type: Date,
    default: new Date()
    // default: Date.now
  },
  createdBy: {
    type: String,
    required: true
  }
});

blogSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const Blog: Model<IBlogSchema> = mongoose.model('Blog', blogSchema, 'blogs_collection');
