import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  manufacture: {
    type: String,
    required: true,
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

// Creating a compound index to enforce uniqueness on 'manufacture' and 'model'
categorySchema.index({ manufacture: 1, model: 1 }, { unique: true });

export default mongoose.model("Category", categorySchema);
