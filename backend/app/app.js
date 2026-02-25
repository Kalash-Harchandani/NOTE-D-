import express from "express";
import healthRoute from "../routes/health.route.js";
import folderRoutes from "../routes/folder.route.js";
import noteRoutes from "../routes/note.route.js";
const app = express();

app.use(express.json());

app.use("/api/health",healthRoute);

app.use("/api/folders",folderRoutes);

app.use("/api/notes",noteRoutes);

export default app;