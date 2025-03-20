import Order from "../models/Order.js";


const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "name email");
    if (!orders) {
      return res.status(404).json({
        success: false,
        message: "No orders found",
      });
    }
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({success:false, message:"Internal server error in fetching all orders through admin!"})
  }
}

const updateOrder = async (req, res) => {
  const id = req.params.id
  try {
    const order = await Order.findById(id)
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    order.isDelivered = req.body.status==="Delivered"? true : order.isDelivered;
    order.status = req.body.status || order.status;
    order.deliveredAt = req.body.status ==="Deliverd"?Date.now() : order.deliveredAt;
    const updatedOrder = await order.save();
    res.status(200).json({
      success: true,
      updatedOrder
    });
  } catch (error) {
    res.status(500).json({success:false, message:"Internal server error in updating order through admin!"})
  }
}

export {getOrders, updateOrder}