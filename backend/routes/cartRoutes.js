import express from "express"
const router = express.Router()
import {addToTheCart, updateCart, removeFromTheCart} from '../controllers/cart.controller.js'

router.post('/', addToTheCart)
router.put('/', updateCart)
router.delete('/', removeFromTheCart)
router.get('/', getProductsinTheCart)

export default router