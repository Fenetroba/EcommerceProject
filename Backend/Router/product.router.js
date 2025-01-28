import express from "express"
import {AdminRout, ProtectedRoute} from '../middleware/Product.protecter.js'
import { createProduct, deletProduct, GetAllProduct, getFeaturProduct, GetProductByCategory, recommendationProduct, toggleFeatcherdProduct } from "../controller/product.controler.js";
const router =express.Router();
router.get('/',ProtectedRoute,AdminRout,GetAllProduct)
router.get('/featured',getFeaturProduct)
router.get('/recommendation',recommendationProduct)
router.get('/category/:category',GetProductByCategory)
router.post('/',ProtectedRoute,AdminRout,createProduct)
router.patch('/:id',ProtectedRoute,AdminRout,toggleFeatcherdProduct)
router.delete('/:id',ProtectedRoute,AdminRout,deletProduct)




export default router;