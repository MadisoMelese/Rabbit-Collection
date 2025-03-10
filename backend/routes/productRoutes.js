import express from "express"
const router = express.Router()
import {protectAuth, admin} from '../middleWare/protectAuth.js'

import {createProduct, getAllProduct, updateProduct, deleteProduct, getProductById, similarProduct, bestSeller, newArrivals} from '../controllers/product.controller.js'
router.get('/', getAllProduct)
router.post('/createProduct', protectAuth,  admin, createProduct)
router.get('/bestSeller', bestSeller)
router.get('/newArrivals', newArrivals)
router.put('/products/:id', protectAuth,  admin, updateProduct)
router.get('/:id', getProductById)
router.get('/similarProduct/:id', similarProduct)

router.delete('/products/:id', protectAuth,  admin, deleteProduct)

export default router
