import express from 'express';
import { protectAuth } from './../middleWare/protectAuth.js';
import {createCheckout, updateCheckout, finalizeCheckout} from '../controllers/checkout.controller.js'
const router = express.Router()

router.post('/', protectAuth, createCheckout);
router.put('/:id/pay', protectAuth, updateCheckout);
router.post('/:id/finalize', protectAuth, finalizeCheckout);


export default router