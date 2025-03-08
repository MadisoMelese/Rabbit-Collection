import express from "express"
const router = express.Router()
import {protectAuth, admin} from '../middleWare/protectAuth.js'

import {createProduct, getAllProduct, updateProduct, deleteProduct, getProductById, similarProduct} from '../controllers/product.controller.js'

router.get('/', getAllProduct)
router.get('/:id', getProductById)
router.get('/similarProduct/:id', similarProduct)
router.post('/createProduct', protectAuth,  admin, createProduct)
router.put('/products/:id', protectAuth,  admin, updateProduct)
router.delete('/products/:id', protectAuth,  admin, deleteProduct)

export default router
