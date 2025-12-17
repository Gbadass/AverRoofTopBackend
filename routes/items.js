import { Router } from "express";
import { requireAdminKey } from "../middleware/requireAdmindKeys.js";
import {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem
} from "../controller/items.js";

const router = Router();

router.get("/", getItems);
router.get("/:slug", getItem);

router.post("/", requireAdminKey, createItem);
router.put("/:slug", requireAdminKey, updateItem);
router.delete("/:slug", requireAdminKey, deleteItem);

export default router;
