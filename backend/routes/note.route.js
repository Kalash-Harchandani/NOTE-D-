import express from "express";
import {
    getNotesInFolder,
    getNote,
    createNote,
    deleteNote
} from "../controllers/note.controller.js";

const router  = express.Router();

router
    .route("/folder/:folderId")
    .get(getNotesInFolder)
    .post(createNote);

router
    .route("/:id")
    .get(getNote)
    .delete(deleteNote);
    
export default router;