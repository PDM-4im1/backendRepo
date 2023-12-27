import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  datePublished: {
    type: String,
    required: false,
  },
 /* category: {
    type: String,
  },
  tags: {
    type: [String],
  },
  views: {
    type: Number,
    default: 0,
  },
  comments: {
    type: Number,
    default: 0,
  },*/
});

export default mongoose.model("Blog", BlogSchema);