// import jwt from 'jsonwebtoken'

// export const protectAuth = async (req, res, next) =>{
//   const token = req.cookies.token;
//   if (!token) {
//     return res.status(401).json({
//       success: false, message: "Unauthorized - no token provided"
//     })
//   }
//   try {
//     const secretKey = process.env.JWT_SECRET
//     const decoded = jwt.verify(token, secretKey)
//     if (!decoded) {
//       return res.status(401).json({
//         success: false, message: "Unauthorized - Invalid token!"
//       })
//     }
//     req.userId = decoded.userId;
//     next()
//   } catch (err) {
//     res.status(500).send("Error in server", err)
//   }
// }



import jwt from 'jsonwebtoken'
import {User} from '../models/User.js' // Import User model

export const protectAuth = async (req, res, next) => {
  console.log("Incoming Cookies: ", req.cookies);
  const token = req.cookies.token
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized - No token provided',
    })
  }

  try {
    const secretKey = process.env.JWT_SECRET
    const decoded = jwt.verify(token, secretKey)
    console.log("Decoded Token: ", decoded);
    
    if (!decoded.userInfo) {
      return res.status(401).json({ success: false, message: "Invalid token - No userId!" });
    }

    // Fetch user from DB and attach to req
    const user = await User.findById(decoded.userInfo).select("-password");
    console.log("User Found in DB: ", user); // Debugging

    if (!user) {
      return res.status(401).json({ success: false, message: "User not found in database" });
    }

    req.user = user // 🔥 Attach full user object, not just userId
    next()
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}
