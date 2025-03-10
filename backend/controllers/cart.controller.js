import { Cart } from "../models/Cart.js";
import Product  from "../models/product.js";

const getCart = async (userId, guestId) => {
  if (userId) {
    return await Cart.findOne({user: userId})
  } else if(guestId) {
    return await Cart.findOne({guestId})
  }
  return null;
}

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
        userId:userId?userId:undefined,
        guestId:guestId?guestId:"guest_"+ new Date().getTime(),
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
      return res.status(201).json({success:true, newCart: newCart})
    }
  } catch (error) {
    console.error("Erro in Add to cart", error)
    res.status(500).json({success:false, message:"Server Error in Add to the cart!"})
  }
}

// update order w/c added in the cart
const updateCart = async (req, res) => {
  const {productId, quantity, size, color, guestId, userId} = req.body;

  try {
    let cart = await getCart(userId, guestId);
    if(!cart){
      return res.status(404).json({success:false, message:"Cart not found!"})
    }

    const productIndex = cart.products.findIndex((product)=> 
    product.productId.toString()===productId && 
    product.size===size &&
    product.color===color
    );
    if(productIndex >-1){
      // update quantity
      if (quantity>0) {
        cart.products[productIndex].quantity=quantity;
      }else{
        cart.products.splice(productIndex, 1) // it removes products if quantity is 0
      }

      // total price
      cart.totalPrice= cart.products.reduce((acc, item)=>acc + item.price*item.quantity, 0);

      await cart.save();
      return res.status(200).json(cart)
    }else{
      return res.status(404).json({message:"Product not found!"})
    }
  } catch (error) {
    console.error("Server Error in updating cart!", error)
    res.status(500).json({success:false, message:"Server Error in updating cart!"})
  }
}

// remove product from the cart
const removeFromTheCart = async (req, res) => {
  const {productId, quantity, size, color, guestId, userId} = req.body;
  try {
    let cart = await getCart(userId, guestId);
    if (!cart) {
      return res.status(404).json({success: true, message:"cart not found!"})
    }
    const productIndex = cart.products.findIndex((product)=> 
      product.productId.toString()===productId && 
      product.size===size &&
      product.color===color
      );
      if(productIndex >-1){
        cart.products.splice(productIndex, 1)
        cart.totalPrice= cart.products.reduce((acc, item)=>acc+item.price*item.quantity, 0)
        await cart.save()
        return res.status(200).json({success:true, cart:cart})
      }else{
        return res.status(404).json({success:fale, message:"product not found in the cart"})

      }
  } catch (error) {
    console.error("Serner in removing from cart", error)
    res.status(500).json({success:false, message:"Server Error in removing from cart!"})
  }
}

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

export {addToTheCart, updateCart, removeFromTheCart, getProductsinTheCart}