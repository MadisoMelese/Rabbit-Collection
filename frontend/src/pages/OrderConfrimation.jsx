import { useDispatch, useSelector } from "react-redux";
import QRCodeGenerator from "./QrCodeGenerator";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { clearCart } from "../redux/slice/cart.Slice";


const OrderConfrimation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {checkout} = useSelector((state)=>(state.checkout));

  useEffect(()=>{
    if(checkout && checkout._id){
      dispatch(clearCart())
      localStorage.removeItem("cart")
    }else{
      navigate("/my-orders")
    }
  }, [checkout, dispatch, navigate])
  const calculateEstimatedDeliveryTime =(createdAt)=>{
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 10);
    return orderDate.toDateString();
  }
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-4xl font-bold text-center text-emerald-700 mb-8">Thank you for your order!</h1>

      {checkout&& (
        <div className="p-6 rounded-lg border border-gray-300">
          <div className="flex flex-wrap justify-between mb-20">
            {/* order id and date */}
            <div>
              <h2 className="text-xl font-semibold">
                Order Id: {checkout._id}
              </h2>
              <p className="text-gray-600">Order Date: {new Date(checkout.createdAt).toDateString()}</p>
            </div>

            {/* Estimated time for delivery */}
            <div>
            <p className="text-emerald-700 text-sm">
              Estimated delivery time:{" "}
              {calculateEstimatedDeliveryTime(checkout.createdAt)}
            </p>
            </div>
          </div>

          {/* order items */}
          <div className="flex flex-wrap justify-between mb-20">
            <div className="flex">
              <img src={checkout.checkoutItems[0].image} alt={checkout.checkoutItems[0].name}
              className="w-20 h-20 object-cover rounded-lg mr-4" 
              />
                 <div className="justify-start">
                  <h3 className="text-md tracking-tighter">
                  {checkout.checkoutItems[0].name}
                  </h3>
                  <div>
                  <p className="text-gray-500">
                    {checkout.checkoutItems[0].color} | {checkout.checkoutItems[0].size}
                  </p>
                  </div>

                 </div>
            </div>
            <div className=" ">
              <h3 className="text-md tarcking-tighter">SAR: {checkout.checkoutItems[0].price} </h3>
              <div>
                <p className="text-gray-500">Quantity: {checkout.checkoutItems[0].quantity}
                </p>
              </div>
            </div>
          </div>

          {/* payment info */}
          <div className="flex flex-wrap justify-between items-center">
          <div>
            <h4 className="text-lg font-semibold mb-2">Payment Method</h4>
            <p className="text-gray-600">Paypal</p>
          </div>

          {/* Delivery Info */}
          <div>
            <h4 className="text-lg font-semibold mb-2">Delivery</h4>
            <p className="text-gray-600">{checkout.shippingAddress.address}</p>  
            <p className="text-gray-600">{checkout.shippingAddress.city}, {checkout.shippingAddress.country}</p>
          </div>
          </div>
          <QRCodeGenerator />

        </div>
        
      )}

    </div>
  )
}

export default OrderConfrimation
