import { Link } from "react-router-dom";
import {
  HiOutlineUser,
  HiBars3BottomRight,
  HiOutlineShoppingBag,
} from "react-icons/hi2";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";
import { useState } from "react";
const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  return (
    <>
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Left- Logo */}
        <div>
          <Link to="/" className="text-2xl font-medium">
            Rabbit
          </Link>
        </div>

        {/* center -Naviagtion Links*/}
        <div className="hidden md:flex space-x-6">
          <Link
            to={"#"}
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Men
          </Link>
          <Link
            to={"#"}
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Women
          </Link>
          <Link
            to={"#"}
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Top Wear
          </Link>
          <Link
            to={"#"}
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            bottom wear
          </Link>
        </div>

        {/* Right-Naviagtion Links */}

        <div className="flex items-center space-x-4">
          <Link className="hover:text-black">
            <HiOutlineUser className="size-6 text-gray-700" />
          </Link>

          <button 
          onClick={toggleDrawer}
          className="relative hover:text-black">
            <HiOutlineShoppingBag className="size-6 text-gray-700" />
            <span className="absolute -top-1 bg-[#ea2e0e] text-white text-xs rounded-full px-2 py-0.5">
              5
            </span>
          </button>

          {/* Search Icon */}
          <SearchBar />

          <button className="md:hidden">
            <HiBars3BottomRight className="size-6 text-gray-700" />
          </button>
        </div>
      </nav>

      {/* crat drawer */}
      <CartDrawer 
        toggleDrawer={toggleDrawer} 
        drawerOpen={drawerOpen} 
      />
    </>
  );
};

export default NavBar;
