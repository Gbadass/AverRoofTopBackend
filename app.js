import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

import categoriesRoutes from "./routes/categories.js";
import itemsRoutes from "./routes/items.js";
import metaRoutes from "./routes/meta.js";
import scansRoutes from './routes/scan.js'
import tablesRoutes from "./routes/tables.js";
import adminRoutes from "./routes/admin.js";

dotenv.config();

const app = express();

app.use(morgan("dev"));
app.use(cors({ origin: "*" }));

app.use(express.json({ limit: "2mb" }));

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.use("/api/categories", categoriesRoutes);
app.use("/api/items", itemsRoutes);
app.use("/api/meta", metaRoutes);
app.use("/api/scans", scansRoutes);
app.use("/api/tables", tablesRoutes);
app.use("/api/admin", adminRoutes);

app.use((req, res) => res.status(404).json({ message: "Route not found" }));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Server error", error: err?.message });
});

export default app;
