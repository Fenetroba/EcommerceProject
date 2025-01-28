import express from "express";
import { ProtectedRoute } from "../middleware/Product.protecter.js";
import { checkoutSuccess, createCheckoutSession } from "../controller/payment.controller.js";

const router = express.Router();

router.post("/create-checkout-session", ProtectedRoute, createCheckoutSession);
router.post("/checkout-success", ProtectedRoute, checkoutSuccess);

export default router;