// import { useState } from "react"
import { IoMdClose } from "react-icons/io";
import CartContents from "../Cart/CartContents";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { HiOutlineShoppingBag } from "react-icons/hi2";

const CartDrawer = ({ toggleDrawer, drawerOpen }) => {
  const navigate = useNavigate();
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const userId = user ? user._id : null;
  const handleCheckout = () => {
    toggleDrawer();
    if (!user) {
      navigate("/login?redirect=checkout");
    } else {
      navigate("/checkout");
    }
  };
  const handleGoToShop = () =>{
    navigate("/collection/all");
    toggleDrawer();
  }

  return (
    <div
      className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[30rem] h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${
        drawerOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-end p4">
        <button onClick={toggleDrawer}>
          <IoMdClose className="size-6 text-gray-700" />
        </button>
      </div>

      {/* Cart content with scrolable area */}
      <div className="flex-grow p-4 overflow-y-auto">
        <h2 className="text-xl semifont-bold mb-4">Your Cart</h2>
        {cart && cart?.products?.length > 0 ? (
          <CartContents cart={cart} userId={userId} guestId={guestId} />
        ) : (
          <p className="text-center">Your cart is Empty</p>
        )}

        {/* Componens for cart contents */}
      </div>
      <div className="p-4 bg-white sticky bottom-0">
        {cart && cart?.products?.length > 0 ? (
          <>
            <button
              onClick={handleCheckout}
              className="w-full bg-black text-white py-3 font-semibold rounded-lg hover:bg-gray-800 transtion"
            >
              Checkout
            </button>
            <p className="text-sm tracking-tighter text-gray-600 mt-2 text-center">
              Shipping, taxes, and dicount codes calculated at checkout.
            </p>
          </>
        ) : (            <button
          onClick= {handleGoToShop}
          className="w-full flex justify-center items-center bg-black text-white py-3 font-semibold rounded-lg hover:bg-gray-800 transtion"
        >
          Go to Shop <HiOutlineShoppingBag className="ml-2 size-6 text-white" />
        </button>)}
      </div>
    </div>
  );
};

export default CartDrawer;
