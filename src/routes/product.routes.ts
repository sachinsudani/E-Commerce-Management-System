import express from "express";
import { createProduct, deleteProduct, getAllProduct, updateProduct } from "../controllers/product.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { adminMiddleware } from "../middleware/admin.middleware";

const router = express.Router();

router.post("/",[authMiddleware, adminMiddleware], createProduct);
router.get("/", authMiddleware, getAllProduct);
router.put("/:id", [authMiddleware, adminMiddleware], updateProduct);
router.delete("/:id", [authMiddleware, adminMiddleware], deleteProduct);

export default router