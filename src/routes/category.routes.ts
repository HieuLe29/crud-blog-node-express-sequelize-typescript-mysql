import express from "express";
import { createCategory, deleteCategory, findBlogsByCategoryId, findCategoriesByName, getCategories, getCategoryById, updateCategory } from "../controllers/category.controller";

const router = express.Router();

router.post("/", createCategory);
router.get("/", getCategories);
router.get("/:id/findById", getCategoryById);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory)
router.get("/findByName", findCategoriesByName);
router.get("/:id/findBlogsByCategoryId", findBlogsByCategoryId);

export default router;