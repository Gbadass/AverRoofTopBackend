import express from "express";
import { createScan, getScanStats,getScans } from "../controller/scan.js";
import { requireAdminKey } from "../middleware/requireAdmindKeys.js";

const router = express.Router();

// public: customers scanning
router.post("/", createScan);


// admin: full scans list (for analytics)
router.get("/",  getScans);

// admin only: view stats
router.get("/stats",  getScanStats);

export default router;
