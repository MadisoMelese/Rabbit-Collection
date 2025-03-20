import express from "express"
import { protectAuth, admin } from "../middleWare/protectAuth.js";
import { getAllUsers } from "../controllers/auth.controller.js";
import { adminCreateNewUser } from "../controllers/admin.controller.js";

const router = express.Router()

router.get('/users', protectAuth, admin, getAllUsers)
router.post('/createUser', protectAuth, admin, adminCreateNewUser)

export default router

