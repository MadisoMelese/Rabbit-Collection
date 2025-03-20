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

export {adminCreateNewUser, adminGetAllUsers}