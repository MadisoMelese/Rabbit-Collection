import express from "express"
import { protectAuth, admin } from "../middleWare/protectAuth.js";
import { adminCreateNewUser, adminGetAllUsers, adminUpdateUser } from "../controllers/admin.controller.js";

const router = express.Router()

router.post('/createUser', protectAuth, admin, adminCreateNewUser)
router.get('/users', protectAuth, admin, adminGetAllUsers)
router.put('/users/:id', protectAuth, admin, adminUpdateUser)


export default router

