import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail, sendResetSuccessEmail } from "../mailtrap/emails.js";

// Signup page
const signup = async (req, res) => {
};

// Verify Email Page page
const verifyEmail = async (req, res) => {
};

// Login page
const login = async (req, res) => {
};


// Logout page
const logout = async (req, res) => {
};

// Forgot password!
const forgotPassword = async (req, res) =>{
}

//reset password
const resetPassword= async (req, res) => {
}
//check auth
const checkAuth = async (req, res) =>{ 
}

export {forgotPassword, logout, login, verifyEmail, signup, resetPassword, checkAuth}