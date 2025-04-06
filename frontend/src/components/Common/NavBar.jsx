import { Link } from "react-router-dom";
import {
  HiOutlineUser,
  HiBars3BottomRight,
  HiOutlineShoppingBag,
} from "react-icons/hi2";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";

const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawOpen, setNavDrawOpen] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const cartItems = cart?.products?.reduce(
    (total, product) => total + product.quantity,
    0
  ) || 0;

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const toggleNavDrawer = () => {
    setNavDrawOpen(!navDrawOpen);
  };

  const navLinks = [
    { to: "collection/all?gender=Men", label: "Men" },
    { to: "collection/all?gender=Women", label: "Women" },
    { to: "collection/all?category=Top Wear", label: "Top Wear" },
    { to: "collection/all?category=Bottom Wear", label: "Bottom Wear" },
  ];

  return (
    <>
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Left - Logo */}
        <div>
          <Link to="/" className="text-2xl font-medium">
            Madisha Shop
          </Link>
        </div>

        {/* Center - Navigation Links */}
        <div className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-gray-700 hover:text-black text-sm font-medium uppercase"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right - Navigation Links */}
        <div className="flex items-center space-x-4">
          {/* Admin Link */}
          <Link
            to="/admin"
            className="block bg-black px-2 rounded text-sm text-white"
          >
            Admin
          </Link>

          {/* Profile Link */}
          <Link className="hover:text-black" to={"/profile"}>
            <HiOutlineUser className="text-2xl text-gray-700" />
          </Link>

          {/* Cart Icon */}
          <button
            onClick={toggleDrawer}
            className="relative hover:text-black"
            aria-label="Open Cart"
          >
            <HiOutlineShoppingBag className="text-2xl text-gray-700" />
            {cartItems > 0 && (
              <span className="absolute -top-1 bg-[#ea2e0e] text-white text-xs rounded-full px-1 py-0.5">
                {cartItems}
              </span>
            )}
          </button>

          {/* Search Icon */}
          <SearchBar />

          {/* Mobile Navigation Icon */}
          <button
            onClick={toggleNavDrawer}
            className="md:hidden"
            aria-label="Open Navigation"
          >
            <HiBars3BottomRight className="text-2xl text-gray-700" />
          </button>
        </div>
      </nav>

      {/* Cart Drawer */}
      <CartDrawer toggleDrawer={toggleDrawer} drawerOpen={drawerOpen} />

      {/* Mobile Navigation Drawer */}
      {navDrawOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleNavDrawer}
        ></div>
      )}
      <div
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          navDrawOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button>
            <IoMdClose
              onClick={toggleNavDrawer}
              className="text-2xl text-gray-600"
            />
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Menu</h2>
          <nav className="space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={toggleNavDrawer}
                className="block text-gray-600 hover:text-black"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default NavBar;