import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, default: "" },
    images: [
      {
        url: { type: String, required: true },
        publicId: { type: String, required: true },
      }
    ],
    videos: [
      {
        url: { type: String, required: true },
        publicId: { type: String, required: true },
      }
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);
