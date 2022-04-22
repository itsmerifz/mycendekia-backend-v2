import mongoose from "mongoose";

const schema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      minLength: 6
    },
    image: {
      type: String,
      data: Buffer,
      default: 'default.jpg'
    },
    createdAt: {
      type: Number,
    },
    updatedAt: {
      type: Number,
    },
  },
  {
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
  }
);

export default mongoose.model('users', schema);
