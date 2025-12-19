import express from "express";
import { createScan, getScanStats } from "../controller/scan.js";
import { requireAdminKey } from "../middleware/requireAdmindKeys.js";

const router = express.Router();

// public: customers scanning
router.post("/", createScan);

// admin only: view stats
router.get("/stats", requireAdminKey, getScanStats);

export default router;
