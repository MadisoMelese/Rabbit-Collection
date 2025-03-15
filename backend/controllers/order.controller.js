import {order} from '../models/Order.js'

const myOrders = async (req, res) => {
  try {
    // find orders for the authenticated user
    const orders = await order.find({user: req.user._id}).sort({createdAt:-1})
    res.status(200).json({success:true, orders})
  } catch (error) {
    console.error("Server error in getting orders", error)
    res.status(500).json({success:false, message:"Server error in gettind all orders"})
  }
}


export {myOrders}