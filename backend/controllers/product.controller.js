import express, { json } from 'express';
import Product from '../models/product.js'
const router = express.Router();

// Get all products
// @access: public
const getAllProduct = async (req, res) => {

  // simple stack
//   try {
//     const products = await Product.find()
//     console.log("Products: ", products)
//     res.json(products)
//   } catch (err) {
//     res.status(500).json({ message: err.message })
//   }
// 

// in hard way but neccessary
try {
  const {collection, size, color, gender, minPrice, maxPrice, sortBy, search, category, material, brand, limit}= req.query;

  let query = {}

  // filtering logic
  if (collection && collection.toLocaleLowerCase() !== "all") {
    query.collections=collection;
  }
  if (category && category.toLocaleLowerCase() !== "all") {
    query.category=category;
  }
  if (material) {
    query.material={$in: material.split(",")};
  }
  if (brand) {
    query.brand={$in:brand.spilt(",")};
  }
  if (size) {
    query.sizes={$in:size.spilt(",")};
  }
  if(color){
    query.colors={$in:[color]}
  }
  if(gender){
    query.gender=gender
  }

  if(minPrice||maxPrice){
    query.price={}
    if(minPrice) query.price.gte= Number(minPrice);
    if(maxPrice) query.price.lte= Number(maxPrice);
  }
  if(search){
    query.$or=[{
      name:{
        $regex:search,
        $options:"i"
      },
      description:{
        $regex:search,
        $options:"i"
      }
    }]
  }

  // sorting Logic
  let sort={}
  if(sortBy){
    switch(sortBy){
      case "priceAsc":
        sort = {price:1};
        break;
      case "priceDesc":
        sort = {price:-1};
        break;
      case "popularity":
        sort = {rating: -1};
        break;
      default:
        break;
    }
  }

  // fetching products and apply sorting and limit
  let products = await Product.find(query).sort(sort).limit(Number(limit) || 0)

    console.log("Products: ", products)
    res.json(products)
  } catch (err) {
    console.error("Error in fetching products", err)
    res.status(500).json({ message: err.message })
  }
}
// @access: public
const getProductById = async (req, res) => {
  const id = req.params.id
  try {
    const product = await Product.findById(id)
    if (!product) {
      res.status(404).json({success:false, message:`Product with id ${id} not found!`})
    }
    res.status(200).json({success:true, Product:product})

  } catch (error) {
   console.log("Error in finding product by id: ", error) 
   json.status(500).json({success:false, message:"server error in finding product by id!"})
  }
}
// @access: public
const similarProduct = async (req, res) => {
  const { id } = req.params;
  // console.log(id); //for debugging purpose only
  try {
    const product = await Product.findById(id)
    if (!product) {
      return res.status(404).json({success:false, message:`Product with id ${id} not found!`})
    }
    const similarProduct = await Product.find({
      _id: {$ne: id}, //excluding current product id
      gender:product.gender,
      category:product.category,
    }).limit(4)
    res.status(200).json({success:true, similarProducts:similarProduct})
  } catch (error) {
    console.error("Error in fetching similarproduct!", error)
    res.status(500).send("Server Error in fetching similar products")
  }  
}
// @desscription: best seller section fetch using highest rating 
// @access: public
const bestSeller = async (req, res) => {
  try {
    const bestSeller = await Product.findOne().sort({rating: -1})
    if (!bestSeller) {
      return res.status(404).json({success:false, message:"No best Seller found!"})
    }
    res.json({success:true, bestSeller:bestSeller})
  } catch (error) {
    console.log("Error in best seller", error)
    res.status(500).send("Server error in best seller section")
  }
}
const newArrivals = async (req, res) => {
  try {
    
    const newArrivals = await Product.find().sort({createdAt: -1}).limit(8)
    if(!newArrivals){
      return res.status(404).json({success:false, message:"New Arrivals not found!"})
    }
    res.status(200).json(newArrivals)
  } catch (error) {
    console.error("Error in new arrivals section:", error)
    res.status(500).send("Server Error in New Arrivals section")
  }
}
// @desc: adding product to the database
// @access: private
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
// @access: private
const updateProduct = async (req, res) => {
  const id = req.params.id;
  const productData = req.body;

  // Check if the request body is empty
  if (Object.keys(productData).length === 0) {
    return res.status(400).json({ success: false, message: 'No update data provided' });
  }

  try {
    const product = await Product.findByIdAndUpdate(id, productData, { new: true });

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({ success: true, message: "Product updated successfully", data: product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// @access: private
const deleteProduct = async (req, res) => {
  const id = req.params.id;

  try {
    const product = await Product.findByIdAndDelete(id)
    if (product) {
      res.status(200).json({ success: true, message: "Product deleted successfully", data: product });
    }else{
      res.status(404).json({success:false, message:`Product with this id ${id} Not found!`})
    }
  } catch (error) {
    console.error("Error in deleting product: ", error)
    res.status(500).send("Server error in deleting product!")
  }
}



export {createProduct, getAllProduct, updateProduct, deleteProduct, getProductById, similarProduct, bestSeller, newArrivals}
