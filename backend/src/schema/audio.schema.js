import mongoose from "mongoose";

const AudioSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  uid: {
    type: mongoose.Types.ObjectId,
    ref: "users"
  },
  progress: {
    type: String,
    enum: ["completed", "in queue", "processing", "error"],
    default: "in queue"
  },
  filePath: {
    type: String,
    required: true,
  },
  text: {
    type: String,
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

export default mongoose.model("audios", AudioSchema);