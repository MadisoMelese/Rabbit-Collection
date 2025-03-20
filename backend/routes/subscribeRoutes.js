import express from 'express';
import  {subscribe}  from '../controllers/subscriber.controller.js';
const router = express.Router();

router.post('/', subscribe);

export default router;