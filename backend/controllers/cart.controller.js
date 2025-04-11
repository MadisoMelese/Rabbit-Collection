import { Cart } from "../models/Cart.js";
import Product  from "../models/product.js";

const getCart = async (userId, guestId) => {
  if (userId && guestId) {
    console.warn("Both userId and guestId provided. Prioritizing userId:", { userId, guestId });
  }

  if (userId) {
    return await Cart.findOne({ user: userId });
  } else if (guestId) {
    return await Cart.findOne({ guestId });
  }
  return null;
};

// add order in the cart
const addToTheCart = async (req, res) => {
  const {productId, quantity, size, color, guestId, userId} = req.body;

  try {
    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({success: false, message:`Product with id ${productId} not found!`})
    }

    // Chech the user logged in or gust
    let cart = await getCart(userId, guestId);
    // if the cart exists, update it
    if (cart) {
      const productIndex = cart.products.findIndex((product)=> 
        product.productId.toString()===productId && 
      product.size===size &&
      product.color===color
      );

      if (productIndex > -1) {
        // if the product already exists, we can update the quantity only
        cart.products[productIndex].quantity+=quantity;
      }
      else{
        // add new product
        cart.products.push({
          productId,
          name:product.name,
          image:product.images[0].url,
          price:product.price,
          size,
          color,
          quantity,
        })
      }

      // Recalculate the total price
      cart.totalPrice=cart.products.reduce((acc, item)=> acc+item.price * item.quantity, 0);
      await cart.save();
      return res.status(200).json(cart)
    }
    else{
      // create new cart for the guest or user
      const newCart = await Cart.create({
        userId:userId? userId : undefined,
        guestId: guestId? guestId: "guest_"+ new Date().getTime(),
        products:[
          {
            productId,
            name:product.name,
            image:product.images[0].url,
            price:product.price,
            size,
            color,
            quantity,
          },
        ],
        
        totalPrice:product.price*quantity,
      })
      return res.status(201).json(newCart)
    }
  } catch (error) {
    console.error("Erro in Add to cart", error)
    res.status(500).json({success:false, message:"Server Error in Add to the cart!"})
  }
}

// update order w/c added in the cart
const updateCart = async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;

  try {
    let cart = await getCart(userId, guestId);
    if (!cart) {
      return res.status(200).json({ success: true, cart: { products: [], totalPrice: 0 } });
    }

    const productIndex = cart.products.findIndex(
      (product) =>
        product.productId.toString() === productId &&
        product.size === size &&
        product.color === color
    );

    if (productIndex > -1) {
      if (quantity > 0) {
        cart.products[productIndex].quantity = quantity;
      } else {
        cart.products.splice(productIndex, 1); // Remove product if quantity is 0
      }

      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      await cart.save();
      return res.status(200).json(cart);
    } else {
      return res.status(404).json({ success: false, message: "Product not found!" });
    }
  } catch (error) {
    console.error("Server Error in updating cart!", error);
    res.status(500).json({ success: false, message: "Server Error in updating cart!" });
  }
};

// remove product from the cart
const removeFromTheCart = async (req, res) => {
  const { productId, size, color, guestId, userId } = req.body;

  try {
    // Fetch the cart for the user or guest
    let cart = await getCart(userId, guestId);

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found!" });
    }

    // Find the index of the product to remove
    const productIndex = cart.products.findIndex(
      (product) =>
        product.productId.toString() === productId &&
        product.size === size &&
        product.color === color
    );

    if (productIndex > -1) {
      // Remove the product from the cart
      cart.products.splice(productIndex, 1);

      // Recalculate the total price
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      // Save the updated cart
      await cart.save();

      return res.status(200).json({ success: true, cart });
    } else {
      return res.status(404).json({ success: false, message: "Product not found in the cart" });
    }
  } catch (error) {
    console.error("Server Error in removing from cart", error);
    res.status(500).json({ success: false, message: "Server Error in removing from cart!" });
  }
};

// get products in the cart
const getProductsinTheCart = async (req, res) => {
  const {userId, guestId}=req.query
  try {
    const cart = await getCart(userId, guestId)
    if (cart) {
      return res.status(200).json({success:true, cart:cart})
    } else {
      return res.status(404).json({success:false, message:"cart not found!"}) 
    }
  } catch (error) {
    console.error("Server error in getProductsinTheCart", error)
    res.status(500).json({success: false, message:"Server error in getProductsinTheCart"})
  }
}

// merge guest cart into user login 
const mergecart = async (req, res) => {
  const { guestId } = req.body;
  try {
    // Find the guest cart and user cart
    const guestCart = await Cart.findOne({ guestId });
    const userCart = await Cart.findOne({ userInfo: req.userInfo });

    if (guestCart) {
      if (!guestCart.products || guestCart.products.length === 0) {
        return res.status(400).json({ message: "Guest cart is empty or invalid" });
      }

      if (userCart) {
        if (!userCart.products) userCart.products = [];

        // Merge guest cart into user cart
        guestCart.products.forEach((guestItem) => {
          const productIndex = userCart.products.findIndex(
            (item) =>
              item.productId.toString() === guestItem.productId.toString() &&
              item.size === guestItem.size &&
              item.color === guestItem.color
          );

          if (productIndex > -1) {
            // If the item exists in the user cart, update the quantity
            userCart.products[productIndex].quantity += guestItem.quantity;
          } else {
            // Otherwise, add the guest item to the cart
            userCart.products.push(guestItem);
          }
        });

        // Update total price correctly
        userCart.totalPrice = userCart.products.reduce((acc, item) => acc + item.quantity * item.price, 0);

        await userCart.save();

        // Remove the guest cart after merging
        await Cart.findOneAndDelete({ guestId });

        return res.status(200).json({ success: true, userCart });
      } else {
        // If the user has no existing cart, assign the guest cart to the user
        guestCart.userInfo = req.userInfo;

        // Properly remove guestId
        guestCart.set("guestId", undefined, { strict: false }); 
        
        await guestCart.save();
        
        // Reload from DB to reflect changes
        const updatedCart = await Cart.findById(guestCart._id).lean();
        
        return res.status(200).json({ success: true, userCarts: updatedCart });
        
      }
    } else {
      if (userCart) {
        // Guest cart has already merged, return user cart
        return res.status(200).json({ success: true, userCart });
      }
      return res.status(400).json({ message: "Guest cart not found!" });
    }
  } catch (error) {
    console.error("Server Error in merging guest", error);
    res.status(500).json({ success: false, message: "Server Error in merging guest" });
  }
};


export {addToTheCart, updateCart, removeFromTheCart, getProductsinTheCart, mergecart}