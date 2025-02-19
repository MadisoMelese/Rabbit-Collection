import { useState } from "react";
import { useNavigate } from "react-router-dom";

const cart = {
  product: [
    {
      name: "Stylish Jacket",
      size: "M",
      color: "Black",
      price: 100,
      image: "https://picsum.photos/500/500?random=9",
    },

    {
      name: "causual T-shirt",
      size: "M",
      color: "White",
      price: 140,
      image: "https://picsum.photos/500/500?random=10",
    },
  ],

  totalPrice: 240,
  totalItems: 2,
};

const CheckOut = () => {
  const navigate = useNavigate();
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address:"",
    city:"",
    postalCode:"",
    country:"",
    phone:"",
  });
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
      {/* Left section */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl uppercase mb-6">Checkout</h2>
        <form action="">
          <h3 className="text-lg mb-4"></h3>
          <div className="mb-4">
            <label htmlFor="" className="text-gray block">
              Email
            </label>
            <input 
            type="email" 
            disabled
            value='user@example.com'
            className="w-full p-2 border rounded" />
          </div>
          <h3 className="text-lg mb-4">
            Delivery
          </h3>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label  
              className="block text-gray-700">First Name</label>
              <input 
              required
              type="text"
              value={shippingAddress.firstName}
              onChange={(e)=>setShippingAddress({...shippingAddress,firstName:e.target.value})}
               className="w-full p-2 border rounded" />
            </div>
            <div>
              <label  
              className="block text-gray-700">Last Name</label>
              <input 
              required
              type="text"
              value={shippingAddress.lastName}
              onChange={(e)=>setShippingAddress({...shippingAddress,lastName:e.target.value})}
               className="w-full p-2 border rounded" />
            </div>
          </div>

          <div className="mb-4">
          <label  
              className="block text-gray-700">Address</label>
            <input 
            value={shippingAddress.address}
            onChange={(e)=>{
              setShippingAddress({...shippingAddress, address:e.target.value})
            }}
            type="text" 
            className="w-full p-2 border rounded" 
            required
            />
            </div>
            <div className="mb-4 grid grid-cols-2 gap-4"></div>
        </form>
      </div>
    </div>
  );
};

export default CheckOut;
