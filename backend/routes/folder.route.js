import express from "express";
import {
    getFolders,
    createFolder,
    deleteFolder
} from "../controllers/folder.controller.js";

const router = express.Router();

router
 .route("/")
 .get(getFolders)
 .post(createFolder);

router
 .route("/:id")
 .delete(deleteFolder);

export default router;
