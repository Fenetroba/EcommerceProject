import express from 'express'
import { getProfile, login, logout, refreshToken, signup } from '../controller/auth.controller.js';
import { ProtectedRoute } from '../middleware/Product.protecter.js';
const router =express.Router();

router.post("/signUp",signup)
router.post("/login",login)
router.post("/logout",logout)
router.post("/refresh",refreshToken)
router.get("/profile", ProtectedRoute, getProfile)

export default router;