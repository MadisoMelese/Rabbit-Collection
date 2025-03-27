import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Product  from "./models/product.js";
import {User}  from "./models/User.js";
import {Cart}  from "./models/Cart.js";
import {products}  from "./data/products.js";

 
dotenv.config();
mongoose.connect(process.env.MONGODB_URL)
const seedData = async ()=>{
  try {
    await Product.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();

    // create default admin user 
    const hashedPassword = await bcrypt.hash("12345678", 10);

    const createdUser = await User.create({
      name:"Admin User",
      email:"admin@example.com",
      password:hashedPassword,
      role:"admin"
    });

    // Assign the default id to each product
    const userID = createdUser._id;

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