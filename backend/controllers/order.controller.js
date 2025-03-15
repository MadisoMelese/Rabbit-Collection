import {Order, order} from '../models/Order.js'

// access:private,
// get logged in user orders
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

// get single order by id
// access : private
const getSingleOrder = async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  )
  if (!order) {
    return res.status(404).json({success:false, message:"order not found!"})
  }
  res.status(200).json({success:true, order})
}

export {myOrders}