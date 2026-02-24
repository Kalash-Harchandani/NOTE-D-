import mongoose from "mongoose";

const folderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps : true },
);

export default mongoose.model("Folder",folderSchema);