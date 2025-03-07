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
// const updateBook = async (req, res) => {
//   const id = req.params.id;
//   const {title, author, publishedYear, price} = req.body;

//   if(!title || !author || !publishedYear || !price){
//     return res.status(400).json({success: false, message: 'Please fill all the fields'});
//   }

//   try{
//     const book = await Book.findByIdAndUpdate(id, {title, author, publishedYear, price}, {new: true});
//     if(!book){
//       return res.status(404).json({success: false, message: 'Book not found'});
//     }
//     res.status(200).json({success: true, data: book});
//   }catch(error){
//     console.log(error);
//     res.status(500).json({success: false, message: 'Internal Server Error'});
// }
// }
const updateProduct = async ( req, res)=>{
  const id = req.params.id
  const requiredFields = [
    "name", "description", "price", "discountPrice", "countInStock", "sku",
    "category", "brand", "sizes", "colors", "collections", "material", "gender",
    "images", "isFeatured", "isPublished", "rating", "numReviews", "tags",
    "dimensions", "weight"
  ];
  
  const productData = req.body;
  const missingField = requiredFields.some(field => !productData[field]);
  
  if (missingField) {
    return res.status(400).json({ success: false, message: 'Please fill all the fields' });
  }
  
  try {
    const product = await Product.findByIdAndUpdate(id, productData, {new: true})
    if (!product) {
      return res.status(404).json({success: false, message: 'Product not found'});
    }

    res.status(200).json({success: true, message:"Product updated successfully", data: product});
  } catch (error) {
    console.log(error);
    res.status(500).json({success: false, message: 'Internal Server Error'});
  }
}


export {createProduct, getAllProduct, updateProduct}
