import express from "express"
const router = express.Router()
import {protectAuth, admin} from '../middleWare/protectAuth.js'

import {createProduct, getAllProduct, updateProduct, deleteProduct, getProductById} from '../controllers/product.controller.js'

router.get('/products', getAllProduct)
router.post('/createProduct', protectAuth,  admin, createProduct)
router.put('/products/:id', protectAuth,  admin, updateProduct)
router.delete('/products/:id', protectAuth,  admin, deleteProduct)
router.get('/:id', protectAuth,  admin, getProductById)

export default router
