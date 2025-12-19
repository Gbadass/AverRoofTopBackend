import express from "express";
import {
  getTables,
  getTableById,
  createTable,
  updateTable,
  deleteTable,
  getTablesWithStats
} from "../controller/tables.js";

import { requireAdminKey } from "../middleware/requireAdmindKeys.js";
const router = express.Router();

// ✅ must be before "/:id"
router.get("/with-stats", requireAdminKey, getTablesWithStats);

// public reads
router.get("/", getTables);
router.get("/:id", getTableById);

// admin writes
router.post("/", requireAdminKey, createTable);
router.put("/:id", requireAdminKey, updateTable);
router.delete("/:id", requireAdminKey, deleteTable);

export default router;
