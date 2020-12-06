import mongoose from "mongoose";

const userModel = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
    },
    googleId: {
      type: String,
      unique: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    nickname: {
      type: String,
    },
    photoUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("user", userModel);
