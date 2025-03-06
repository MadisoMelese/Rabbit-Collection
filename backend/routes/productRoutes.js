import express from "express"
const router = express.Router()
import {protectAuth, admin} from '../middleWare/protectAuth.js'

import {createProduct, getAllProduct} from '../controllers/product.controller.js'

router.get('/products', getAllProduct)
router.post('/createProduct', protectAuth,  admin, createProduct)

export default router
