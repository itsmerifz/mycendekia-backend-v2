import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate'

const schema = mongoose.Schema({
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
  year: {
    type: Number,
    required: true,
    maxLength: 4,
  },
  link: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Number,
  },
  updatedAt: {
    type: Number,
  },
},{
  timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
});

mongoosePaginate(schema);

export default mongoose.model("articles", schema);