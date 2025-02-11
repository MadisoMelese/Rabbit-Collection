// import { useState } from "react"
import { IoMdClose } from "react-icons/io";
import CartContents from "../Cart/CartContents";

// eslint-disable-next-line react/prop-types
const CartDrawer = ({ toggleDrawer, drawerOpen }) => {
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
        <CartContents />
        {/* Componens for cart contents */}
      </div>
      <div className="p-4 bg-white sticky bottom-0">
        <button className="w-full bg-black text-white py-3 font-semibold rounded-lg hover:bg-gray-800 transtion">
          Checkout
        </button>
        <p className="text-sm tracking-tighter text-gray-600 mt-2 text-center">
          Shipping, taxes, and dicount codes calculated at checkout.
        </p>
      </div>
    </div>
  );
};

export default CartDrawer;
