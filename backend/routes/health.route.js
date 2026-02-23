import {healthCheck} from "../controllers/health.controller.js";
import express from "express";

const router = express.Router();

router.get("/",healthCheck);

export default router;
