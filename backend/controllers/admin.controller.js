import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "../mailtrap/emails.js";
import { User } from "../models/User.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

const adminGetAllUsers = async (req, res) => {
  try {
    const users = await User.find({}); // Exclude passwords from all users
    if (!users.length) {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const adminGetsingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json({success:false, message:`user with Id ${id} not found in DB!`})
    }
    res.status(200).json({success:true, message:"user found in DB!", user:user})
  } catch (error) {
    res.status(500).json({success:false, message:"Server error in getting single user by Id!"})
  }
}
const adminCreateNewUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!email || !password || !name || !role) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Please fil All fields they are required!",
      });
  }
  try {
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      // console.log("User already exists");
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = Math.floor(
      100000 + Math.random() * 9000
    ).toString();

    const user = new User({
      email,
      password: hashedPassword,
      name,
      role:role||"customer",
      verificationToken,
      verificationtokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });
    await user.save();

    // json web token (JWT) Generation for every new user
    const userifo = {
      user: {
        id: user._id,
        role: user.role,
      },
    };
    generateTokenAndSetCookie(res, userifo);
    await sendVerificationEmail(user.email, verificationToken);
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const adminUpdateUser = async (req, res) => {
  const id = req.params.id
  try {
  const user = await User.findById(id)
   if (!user) {
    return res.status(400).json({success:false, message:`user with id ${id} not found in DB`})
   } 
   user.name=req.body.name||user.name;
   user.email=req.body.email||user.email;
   user.role=req.body.role||user.role;
   const updatedUser = await user.save();
   res.status(200).json({success:true, message:"user updated successfully!", user:updatedUser})
  } catch (error) {
    res.status(500).json({success:false, message:"Server error in admin updating user by id!"})
  }
}

const adminDeleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    if (user) {
      await user.deleteOne();
      return res.status(200).json({success:true, message:"User deleted successfully!"})
    } else {
      return res.status(404).json({success:false, message:`user with Id ${id} not found!`})
    }
  } catch (error) {
    res.status(500).json({success:false, message:"Server error in deleting user through admin panel"})
  }
}

export {adminCreateNewUser, adminGetAllUsers, adminUpdateUser, adminDeleteUser, adminGetsingleUser}