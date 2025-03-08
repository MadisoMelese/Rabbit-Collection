import mongoose from "mongoose";
import dotenv from "dotenv";
import Product  from "./models/product.js";
import {User}  from "./models/User.js";
import {products}  from "./data/products.js";
 
dotenv.config();
mongoose.connect(process.env.MONGODB_URL)
const seedData = async ()=>{
  try {
    await Product.deleteMany();
    await User.deleteMany();

    // create default admin user 
    const creatdeUser = await User.create({
      name:"Admin User",
      email:"admin@example.com",
      password:"12345678",
      role:"admin"
    });

    // Assign the default id to each product
    const userID = creatdeUser._id;

    const sampleProducts = products.map((product)=>{
      return {...product, user:userID}
    })

    // insert the product into the database
    await Product.insertMany(sampleProducts)

    console.log("Product data seeded successfully!")
    process.exit(1);

  } catch (error) {
    console.error("Error seeding the data:", error)
    process.exit(1);

  }
}

seedData();