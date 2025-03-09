import express from "express"
const router = express.Router()
import {addToTheCart, updateCart} from '../controllers/cart.controller.js'

router.post('/', addToTheCart)
router.put('/', updateCart)

export default router