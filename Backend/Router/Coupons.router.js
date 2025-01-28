import express from "express"
import { ProtectedRoute } from "../middleware/Product.protecter.js";
import { getCoupon, validateCoupon } from "../controller/Coupon.controller.js";
const router =express.Router();
router.get('/',ProtectedRoute,getCoupon)
router.get('/validetor',ProtectedRoute,validateCoupon)
export default router