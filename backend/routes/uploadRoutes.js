import express from 'express';
import multer from 'multer';
import { admin, protectAuth } from '../middleWare/protectAuth.js';
const router = express.Router();
import { uploadImage, upload } from '../controllers/upload.controller.js';


router.post('/', protectAuth, admin, upload.single('image'), uploadImage)
export default router;