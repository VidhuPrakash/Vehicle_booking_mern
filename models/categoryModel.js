import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  manufacture: {
    type: String,
    required: true,
    unique: true,
  },
  model: {
    type: String,
    required: true,
  },
  slue: {
    type: String,
    lowercase: true,
  },
});

export default mongoose.model("Category", categorySchema);
