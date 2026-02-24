import folders from "../models/folders.js";
import Folder from "../models/folders.js";
export const getFolders = async (req, res) => {
  try {
    const { userId } = req.query;
    const folders = await Folder.find({ userId });
    res.status(200).json(folders);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const createFolder = async (req, res) => {
  try {
    const { title, userId } = req.body;
    const newFolder = await Folder.create({
      title,
      userId,
    });
    res.status(201).json(newFolder);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteFolder = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedFolder = await Folder.findByIdAndDelete(id);

    if (!deletedFolder) {
      return res.status(404).json({ message: "Folder not found" });
    }

    res.status(200).json({
      message: "Folder deleted successfully",
      deletedId: id,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};