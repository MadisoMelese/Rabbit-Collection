import express from 'express';
import Product from '../models/product.js'
import {protectAuth} from '../middleWare/protectAuth.js'
const router = express.Router();

// Get all products

const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Create a new product

const createProduct = async (req, res) => {

  try {
    const {name, description, price, discountPrice, countInStock, sku,category, brand, sizes, colors, collections, material, gender, images, isFeatured, isPublished, rating, numReviews, tags, dimensions, weight}  = req.body
  const product = new Product({
    name, 
    description, 
    price, 
    discountPrice, 
    countInStock, 
    sku,
    category, 
    brand, 
    sizes, 
    colors, 
    collections, 
    material, 
    gender, 
    images, 
    isFeatured, 
    isPublished, 
    rating, 
    numReviews, 
    tags, 
    dimensions, 
    weight,
    user: req.user._id, //reference to the admin user who created this product it
  })
    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err.message })
  }
}


export {createProduct, getAllProduct}