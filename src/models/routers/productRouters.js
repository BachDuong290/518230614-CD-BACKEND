import express from "express";
import { listProduct, 
    renderPageCreateProduct, 
    createProduct, 
    renderPageUpdateProduct, 
    updateProduct,
    renderPageDeleteProduct, 
    deleteProduct, } 
    from "../../controllers/productController.js";

const router = express.Router();

router.get("/", listProduct)

router.get("/create", renderPageCreateProduct)  
router.post("/create", createProduct)

router.get("/update/:id", renderPageUpdateProduct)  
router.post("/update/:id", updateProduct)

router.get("/delete/:id", renderPageDeleteProduct)  
router.post("/delete/:id", deleteProduct)

export default router;