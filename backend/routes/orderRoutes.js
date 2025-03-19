import express from "express"
const router = express.Router()
import { protectAuth } from './../middleWare/protectAuth.js';
import { myOrders, getSingleOrder } from './../controllers/order.controller.js';


router.get("/myorders", protectAuth, myOrders)
router.get("/myorders/:id", protectAuth, getSingleOrder)

export default router
