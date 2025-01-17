import express from "express";
import { listCategory, renderPageCreateCategory, createCategory, renderPageUpdateCategory, updateCategory } from "../../controllers/categoryController.js";
const router = express.Router();

router.get("/", listCategory)

router.get("/create", renderPageCreateCategory)  // render ra from create
router.post("/create", createCategory)

router.get("/update/:id", renderPageUpdateCategory)  // render ra from create
router.post("/update", updateCategory)

export default router;