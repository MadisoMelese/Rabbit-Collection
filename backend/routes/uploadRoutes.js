import express from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';
import streamifier from 'streamifier';
import { admin, protectAuth } from '../middleWare/protectAuth.js';
const router = express.Router();


export default router;