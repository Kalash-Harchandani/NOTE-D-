import express from "express";
import healthRoute from "../routes/health.route.js";
import folderRoutes from "../routes/folder.route.js";
const app = express();

app.use(express.json());

app.use("/api/health",healthRoute);

app.use("/api/folders",folderRoutes);

export default app;