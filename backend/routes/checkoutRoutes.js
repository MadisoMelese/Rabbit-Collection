import express from 'express';
import { protectAuth } from './../middleWare/protectAuth.js';
import {createCheckout, } from '../controllers/checkout.controller.js'
const router = express.Router()

router.post('/', protectAuth, createCheckout);

export default router