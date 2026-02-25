import express from "express";
import {
    getFolders,
    createFolder,
    deleteFolder
} from "../controllers/folder.controller.js";
import { protect } from "../middleware/auth.middleware.js";


const router = express.Router();
router.use(protect);

router
 .route("/")
 .get(getFolders)
 .post(createFolder);

router
 .route("/:id")
 .delete(deleteFolder);

export default router;
