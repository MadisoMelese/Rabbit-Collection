import jwt from 'jsonwebtoken'

export const protectAuth = async (req, res, next) =>{
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      success: false, message: "Unauthorized - no token provided"
    })
  }
  try {
    const secretKey = process.env.JWT_SECRET
    const decoded = jwt.verify(token, secretKey)
    if (!decoded) {
      return res.status(401).json({
        success: false, message: "Unauthorized - Invalid token!"
      })
    }
    req.userId = decoded.userId;

    next()
  } catch (err) {
    res.status(500).send("Error in server", err)
  }
}