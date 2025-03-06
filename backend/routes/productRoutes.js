import express from "express"
const router = express.Router()

import {createProduct, getAllProduct} from '../controllers/product.controller.js'

router.get('/products', getAllProduct)
router.post('/createProduct', createProduct)

export default router
