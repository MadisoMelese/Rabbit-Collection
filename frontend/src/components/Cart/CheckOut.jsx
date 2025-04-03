import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PaypalButton from "./PaypalButton";
import { useDispatch, useSelector } from "react-redux";
import { createCheckout } from "../../../../backend/controllers/checkout.controller";
import axios from "axios";

// const cart = {
//   products: [
//     {
//       name: "Stylish Jacket",
//       size: "M",
//       color: "Black",
//       price: 100,
//       image: "https://picsum.photos/500/500?random=9",
//     },

//     {
//       name: "causual T-shirt",
//       size: "M",
//       color: "White",
//       price: 140,
//       image: "https://picsum.photos/500/500?random=10",
//     },
//   ],

//   totalPrice: 240,
//   totalItems: 2,
// };

const CheckOut = () => {
  const url = `${import.meta.env.VITE_BACKEND_URL}`;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, error, loading } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const [checkoutId, setCheckoutId] = useState(null);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });
  // check the cart is empty or not!
  useEffect(() => {
    if (!cart || !cart.products || cart?.product?.length === 0) {
      navigate("/");
    }
  }, [cart, navigate]);

  const handlecreateCheckout = async (e) => {
    e.preventDefault();
    if (cart?.products?.length > 0) {
      const res = await dispatch(
        createCheckout({
          checkoutItems: cart.products,
          shippingAddress,
          paymentMethod: "paypal",
          totalPrice: cart.totalPrice,
        })
      );
      if (res.payload && res.payload._id) {
        setCheckoutId(res.payload._id);
      }
    }
  };

  const handleSuccessPayment = async (details) => {
    try {
      await axios.put(
        `${url}/api/checkout/${checkoutId}/pay`,
        {
          paymentStatus: "paid",
          paymentDetails: details,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      await handleFinalizedCheckout(checkoutId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFinalizedCheckout = async (checkoutId) => {
    try {
      await axios.post(
        `${url}/api/checkout/${checkoutId}/finalize`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      navigate("/order/success");
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: ${error}</p>;
  }
  if (cart?.products?.length === 0) {
    return (
      <>
        <p>Your cart is empty!</p>
        <Link to={"/collection/all"}>Go back to shop</Link>
      </>
    );
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
              value={user ? user.email : ""}
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
            {!checkoutId ? (
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded"
              >
                Countinue to Payment
              </button>
            ) : (
              <div>
                <h3 className="text-lg mb-4">Pay with Paypal</h3>
                <PaypalButton
                  amount={cart?.totalPrice}
                  onSuccess={handleSuccessPayment}
                  onError={(err) => alert("payment failed")}
                />
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Right section */}
      <div className="bg-gray-50 p-6 raunded-lg">
        <h3 className="text-lg mb-4">Order Summary</h3>
        <div className="border-t py-4 mb-4">
          {cart?.products?.map((product, index) => (
            <div
              key={index}
              className="flex items-start justify-between py-2 border-b"
            >
              <div className="flex items-start">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-24 object-cover mr-4"
                />
                <div>
                  <h3 className="text-md">{product.name}</h3>
                  <p className="text-gray-500">Size: {product.size}</p>
                  <p className="text-gray-500">Color: {product.color}</p>
                </div>
              </div>
              <p className="text-xl">
                Price: ${product?.price?.toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center text-lg mb-4">
          <p>Subtotal</p>
          <p>${cart?.totalPrice?.toLocaleString()}</p>
        </div>
        <div className="flex justify-between items-center text-lg mb-4">
          <p>Shipping</p>
          <p>Free</p>
        </div>
        <div className="flex justify-between items-center text-center text-lg mt-4 border-t">
          <p className="mt-4">Total</p>
          <p>${cart?.totalPrice?.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
