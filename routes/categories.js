import { Router } from "express";
import { requireAdminKey } from "../middleware/requireAdmindKeys.js";
import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
} from "../controller/categories.js";

const router = Router();

router.get("/", getCategories);
router.get("/:slug", getCategory);

router.post("/", requireAdminKey, createCategory);
router.put("/:slug", requireAdminKey, updateCategory);
router.delete("/:slug", requireAdminKey, deleteCategory);

export default router;
