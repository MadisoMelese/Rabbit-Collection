import express from "express"
import Product from '../models/product.js'
import {protectAuth} from '../middleWare/protectAuth.js'


const router = express.Router()

