import express from "express";
const router = express.Router();
import { protectAuth, admin } from '../middleWare/protectAuth.js';
import {
  createProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  similarProduct,
  bestSeller,
  newArrivals
} from '../controllers/product.controller.js';

// Public routes
router.get('/', getAllProduct);
router.get('/bestSeller', bestSeller);
router.get('/newArrivals', newArrivals);
router.get('/:id', getProductById);
router.get('/similarProduct/:id', similarProduct);

// Protected routes
router.post('/createProduct', protectAuth, admin, createProduct);
router.put('/:id', protectAuth, admin, updateProduct);
router.delete('/:id', protectAuth, admin, deleteProduct);

export default router;