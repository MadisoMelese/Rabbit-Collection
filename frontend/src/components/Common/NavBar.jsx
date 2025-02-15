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
const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawOpen, setNavDrawOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  const toggleNavDrawer = ()=>{
    setNavDrawOpen(!navDrawOpen)
  }
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
            to={"collection/:all"}
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

          <button 
          onClick={toggleNavDrawer}
          className="md:hidden">
            <HiBars3BottomRight className="size-6 text-gray-700" />
          </button>
        </div>
      </nav>

      {/* crat drawer */}
      <CartDrawer 
        toggleDrawer={toggleDrawer} 
        drawerOpen={drawerOpen} 
      />

      {/* mobile Navigation bar  */}
      <div className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${navDrawOpen? "translate-x-0" :"-translate-x-full"}`}>
      <div className="flex justify-end p-4">
        <button >
          <IoMdClose onClick={toggleNavDrawer} className="size-6 text-gray-600"/>
        </button>
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Menu</h2>
        <nav className="space-y-4">
          <Link to={'#'} onClick={toggleNavDrawer} className="block text-gray-600 hover:text-black">Men</Link>
          <Link to={'#'} onClick={toggleNavDrawer} className="block text-gray-600 hover:text-black">Women</Link>
          <Link to={'#'} onClick={toggleNavDrawer} className="block text-gray-600 hover:text-black">Top Wear</Link>
          <Link to={'#'} onClick={toggleNavDrawer} className="block text-gray-600 hover:text-black">Bottom Wear</Link>
        </nav>
      </div>
      </div>
    </>
  );
};

export default NavBar;
