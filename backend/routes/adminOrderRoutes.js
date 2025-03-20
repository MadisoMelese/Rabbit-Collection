import express from 'express';
const router = express.Router();
import { protectAuth, admin } from "../middleWare/protectAuth.js";
import { getOrders, updateOrder } from "../controllers/adminOrder.controller.js";

router.get("/", protectAuth, admin, getOrders);
router.put("/:id", protectAuth, admin, updateOrder);

export default router;