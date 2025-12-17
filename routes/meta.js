import { Router } from "express";
import { requireAdminKey } from "../middleware/requireAdmindKeys.js";
import { getMeta, updateMeta } from "../controller/meta.js";

const router = Router();

router.get("/", getMeta);
router.put("/", requireAdminKey, updateMeta);

export default router;
