import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PaypalButton from "./PaypalButton";

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
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });
const [checkoutId, setCheckoutId] = useState(null)


  const handlecreateCheckout = (e) => {
    e.preventDefault();
    console.log("checkout created");
    console.log(shippingAddress);
    console.log(checkoutId)
  }

  const handleSuccessPayment = (details)=>{
    console.log("payment success", details);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
      {/* Left section */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl uppercase mb-6">Checkout</h2>
        <form onSubmit={handlecreateCheckout}>
          <h3 className="text-lg mb-4">Contact Details</h3>
          {/* Email */}
          <div className="mb-4">
            <label htmlFor="" className="text-gray block">
              Email
            </label>
            <input
              type="email"
              disabled
              value="user@example.com"
              className="w-full p-2 border rounded"
            />
          </div>
          <h3 className="text-lg mb-4">Delivery</h3>
          {/* Shipping Address */}
          <div className="mb-4 grid grid-cols-2 gap-4">
            {/* First Name */}
            <div>
              <label className="block text-gray-700">First Name</label>
              <input
                required
                type="text"
                value={shippingAddress.firstName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    firstName: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
              />
            </div>
            {/* Last Name */}
            <div>
              <label className="block text-gray-700">Last Name</label>
              <input
                required
                type="text"
                value={shippingAddress.lastName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    lastName: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          {/* Address */}
          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <input
              value={shippingAddress.address}
              onChange={(e) => {
                setShippingAddress({
                  ...shippingAddress,
                  address: e.target.value,
                });
              }}
              type="text"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          {/* City */}
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">City</label>
              <input
                required
                type="text"
                value={shippingAddress.city}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    city: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
              />
            </div>
            {/* Postal code */}
            <div>
              <label className="block text-gray-700">Postal Code</label>
              <input
                required
                type="text"
                value={shippingAddress.postalCode}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    postalCode: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          {/* country */}
          <div className="mb-4">
            <label className="block text-gray-700">Country</label>
            <input
              value={shippingAddress.country}
              onChange={(e) => {
                setShippingAddress({
                  ...shippingAddress,
                  country: e.target.value,
                });
              }}
              type="text"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          {/* Phone number */}
          <div className="mb-4">
            <label className="block text-gray-700">Phine Number</label>
            <input
              value={shippingAddress.phone}
              onChange={(e) => {
                setShippingAddress({
                  ...shippingAddress,
                  phone: e.target.value,
                });
              }}
              type="number"
              min={0}
              className="w-full p-2 border rounded"
              required
            />
          </div>

{/* Payment method */}
          <div className="mt-6">
      {!checkoutId?(
        <button 
        type="submit"
        className="w-full bg-black text-white py-3 rounded">
          Countinue to Payment
        </button>
      ):(
      <div>
        <h3 className="text-lg mb-4">Pay with Paypal</h3>
        <PaypalButton
        amount={cart.totalPrice}
        onSuccess={handleSuccessPayment}
        onError={(err)=>alert("payment failed")}
        />
      </div>
      )}
    </div>
        </form>
      </div>
      
      {/* Right section */}

    </div>
  );
};

export default CheckOut;
