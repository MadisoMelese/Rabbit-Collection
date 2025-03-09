import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  productId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Product",
    require:true,
  },
  name:String,
  image:String,
  price:String,
  size:String,
  color:String,
  quantity:{
    type:Number,
    default:1,
  },
},
{_id: false}
);

const cartSchema = new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
  },
  guestId:{
    type:String
  },
  products:[cartItemSchema],
  totalPrice:{
    type:Number,
    require:true,
    default:0
  },
},
{timestamps:true}
)

export const Cart = mongoose.model("Cart", cartSchema)
