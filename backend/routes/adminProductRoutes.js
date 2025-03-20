import {getAllProducts} from "../controllers/adminProduct.controller.js";
import express from "express";
import { protectAuth, admin } from "../middleWare/protectAuth.js";
const router = express.Router();

router.get("/", protectAuth, admin, getAllProducts);


export default router;