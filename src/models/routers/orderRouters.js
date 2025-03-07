import express from "express";
import { listOrder, 
    renderPageSimulateCreateOrder,
    createOrder,
    simulatorCreateOrder,
    updateStatusDeliveringOrder, } 
    from "../../controllers/orderController.js";

const router = express.Router();

router.get("/", listOrder)

router.get("/create", renderPageSimulateCreateOrder)
router.post("/create", createOrder) 
router.post("/simulatorCreate", simulatorCreateOrder)
router.post("/updateStatusDelivering", updateStatusDeliveringOrder) 

export default router;
