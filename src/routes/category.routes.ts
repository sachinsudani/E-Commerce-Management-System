import express from "express";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { adminMiddleware } from "../middleware/admin.middleware";

const router = express.Router();

router.post("/", [authMiddleware, adminMiddleware], createCategory);
router.get("/", getCategories);
router.get("/:id", getCategoryById);
router.put("/:id", [authMiddleware, adminMiddleware], updateCategory);
router.delete("/:id", [authMiddleware, adminMiddleware], deleteCategory);

export default router;
