import Product from "../models/product.js";

const getAllProducts = async (req, res) => {
  try {
  const products = await Product.find({})
    if (!products) {
      return res.status(404).json({
        success: false,
        message: "No products found",
      });
    }
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({success:false, message:"Internal server error in fetching all products through admin!"})
  }
}


export {getAllProducts}