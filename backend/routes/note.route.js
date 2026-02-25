import express from "express";
import {
    getNotesInFolder,
    getNote,
    createNote,
    deleteNote
} from "../controllers/note.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router  = express.Router();
router.use(protect);

router
    .route("/folder/:folderId")
    .get(getNotesInFolder)
    .post(createNote);

router
    .route("/:id")
    .get(getNote)
    .delete(deleteNote);
    
export default router;