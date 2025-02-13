import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//     unique: true,
//   },
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
  },
  createdAt: {
    type: Date,
    required: true
  },
  lastModified: {
    type: Date,
    required: true
  }
});

export default mongoose.model("users", UserSchema);