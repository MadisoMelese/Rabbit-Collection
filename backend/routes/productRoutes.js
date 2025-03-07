import express from "express"
const router = express.Router()
import {protectAuth, admin} from '../middleWare/protectAuth.js'

import {createProduct, getAllProduct, updateProduct} from '../controllers/product.controller.js'

router.get('/products', getAllProduct)
router.post('/createProduct', protectAuth,  admin, createProduct)
router.post('/products/:id', protectAuth,  admin, updateProduct)

export default router
