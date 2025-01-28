import express from 'express';
import { ProtectedRoute } from '../middleware/Product.protecter.js';
import { Addcart, getCartProducts, removeAllFromCart, updateQuantity } from '../controller/cart.controller.js';
const router =express.Router();
router.post('/',ProtectedRoute,Addcart);
router.get('/',ProtectedRoute,getCartProducts);
router.delete('/',ProtectedRoute,removeAllFromCart);
router.put('/:id',ProtectedRoute,updateQuantity);

export default router;