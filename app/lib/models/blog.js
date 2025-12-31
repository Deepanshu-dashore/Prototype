import mongoose, { Schema, model } from "mongoose";

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    excerpt: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    author: {
      type: String,
      // required: true,
      default: "CC Mating",
    },
    content: {
      type: String,
      required: true,
    },
    featuredImage: {
      type: String,
      required: false,
      default: "",
    },
    featured: {
      type: Boolean,
      default: false,
    },
    readingTime: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Blog = mongoose.models.Blog || model("Blog", blogSchema);
