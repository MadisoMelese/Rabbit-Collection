import express from "express"
const router = express.Router()
import {addToTheCart} from '../controllers/cart.controller.js'

router.post('/', addToTheCart)

export default router