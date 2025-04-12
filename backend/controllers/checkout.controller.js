import { Checkout } from "../models/Checkout.js";
import { Cart } from "./../models/Cart.js";
import Product from "./../models/product.js";
import  Order  from "../models/Order.js";

// @create new check out session
// route: private
const createCheckout = async (req, res) => {
  console.log("Request body:", req.body); // Debugging
  const { checkoutItems, shippingAddress, paymentMethod, totalPrice } = req.body;

  if (!checkoutItems || checkoutItems.length === 0) {
    return res
      .status(400)
      .json({ success: false, message: "No items found in checkout!" });
  }

  try {
    const createCheckout = await Checkout.create({
      user: req.user._id,
      checkoutItems: checkoutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentStatus: "Pending",
      isPaid: false,
    });

    console.log(`Checkout created for user: ${req.user._id}`);
    res.status(201).json(createCheckout); // Return the created checkout object directly
  } catch (error) {
    console.error("Server error in creating checkout", error);
    res
      .status(500)
      .json({ success: false, message: "Server error in creating checkout" });
  }
};

// update checkout to mark as paid after successful payment
// route: private
const updateCheckout = async (req, res) => {
  const { paymentStatus, paymentDetails } = req.body;

  try {
    const checkout = await Checkout.findById(req.params.id);
    if (!checkout) {
      return res.status(404).json({ success: false, message: "Checkout not found!" });
    }

    if (!["paid", "pending"].includes(paymentStatus)) {
      return res.status(400).json({ success: false, message: "Invalid payment status" });
    }

    if (paymentStatus === "paid") {
      checkout.isPaid = true;
      checkout.paymentStatus = paymentStatus;
      checkout.paymentDetails = paymentDetails;
      checkout.paidAt = Date.now();
      await checkout.save();
      return res.status(200).json(checkout);
    } else {
      return res.status(400).json({ success: false, message: "Invalid payment status" });
    }
  } catch (error) {
    console.error("Server Error in updating checkout", error);
    res.status(500).json({ success: false, message: "Server Error in updating checkout" });
  }
};

const finalizeCheckout = async (req, res) => {
  try {
    const checkout = await Checkout.findById(req.params.id);

    if (!checkout) {
      return res.status(404).json({ success: false, message: "Checkout not found" });
    }

    if (!checkout.isPaid) {
      return res.status(400).json({ success: false, message: "Checkout is not paid!" });
    }

    if (checkout.isFinalized) {
      return res.status(400).json({ success: false, message: "Checkout already finalized!" });
    }

    const finalOrder = await Order.create({
      user: checkout.user,
      orderItems: checkout.checkoutItems,
      shippingAddress: checkout.shippingAddress,
      paymentMethod: checkout.paymentMethod,
      paymentDetails: checkout.paymentDetails,
      totalPrice: checkout.totalPrice,
      isPaid: true,
      paidAt: checkout.paidAt,
      isDelivered: false,
      paymentStatus: "paid",
    });

    checkout.isFinalized = true;
    checkout.finalizedAt = Date.now();
    await checkout.save();

    await Cart.findOneAndDelete({ user: checkout.user });

    return res.status(201).json({ success: true, finalOrder });
  } catch (error) {
    console.error("Server error in finalizing checkout!", error);
    return res.status(500).json({ success: false, message: "Server error in finalizing checkout!" });
  }
};

export { createCheckout, updateCheckout, finalizeCheckout };
