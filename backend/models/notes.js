import mongoose, { mongo } from "mongoose";
const notesSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      ref: "User",
      required: true,
      index: true,
    },
    folderId: {
      type: String,
      ref: "Folder",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
    },
  },
  { timestamps : true }
);

export default mongoose.model("Note",notesSchema);

