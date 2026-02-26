import express from "express";
import healthRoute from "../routes/health.route.js";
import folderRoutes from "../routes/folder.route.js";
import noteRoutes from "../routes/note.route.js";
import authRoutes from "../routes/auth.route.js"
import cors from "cors";
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/health",healthRoute);

app.use("/api/folders",folderRoutes);

app.use("/api/notes",noteRoutes);

app.use("/api/auth",authRoutes);

export default app;