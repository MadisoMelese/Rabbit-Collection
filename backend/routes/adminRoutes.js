import express from "express"
import { protectAuth, admin } from "../middleWare/protectAuth.js";
import { adminCreateNewUser, adminGetAllUsers } from "../controllers/admin.controller.js";

const router = express.Router()

router.get('/users', protectAuth, admin, adminGetAllUsers)
router.post('/createUser', protectAuth, admin, adminCreateNewUser)

export default router

