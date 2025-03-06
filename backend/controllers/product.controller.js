import express from 'express';
import Product from '../models/product.js'
const router = express.Router();

// Get all products

const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find()
    console.log("Products: ", products)
    res.json(products)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Create a new product

const createProduct = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: 'User not authenticated' })
  }
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
    user: req.user._id //reference to the admin user who created this product it
  })
    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err.message })
  }
}


export {createProduct, getAllProduct}
