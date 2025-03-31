import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import login from "../assets/login.webp";
import { loginUser } from "../redux/slice/auth.slice.js";
import { useDispatch, useSelector } from "react-redux";
import { mergeCart } from "../redux/slice/cart.Slice.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  // Get redirect parameter and check if it's checkout or something
  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  const isCheckoutRedirect = redirect === "/checkout";
  
  console.log("Location Search:", location.search); // Debugging
  console.log("Redirect URL:", redirect); // Debugging
  console.log("Is Checkout Redirect:", isCheckoutRedirect); // Debugging;

  useEffect(() => {
    console.log("User:", user);
    console.log("Redirect URL:", redirect);

    if (user) {
      if (cart?.products?.length > 0 && guestId) {
        dispatch(mergeCart({ guestId, user })).then(() => {
          console.log("Navigating to:", redirect); // Debugging
          navigate(redirect); // Navigate to the redirect URL
        });
      } else {
        console.log("Navigating to:", redirect); // Debugging
        navigate(redirect); // Navigate to the redirect URL
      }
    }
  }, [user, guestId, cart, navigate, redirect, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Attempt:", { email, password }); // Debugging
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="flex">
      <div className="w-full flex md:w-1/2 flex-col justify-center items-center p-8 md:p-12">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-8 rounded-lg border shadow-sm"
        >
          <div className="flex justify-center mb-6">
            <h2 className="text-xl font-medium">Rabbit</h2>
          </div>
          <h2 className="text-2xl font-bold text-center mb-6">Hey there! 👋</h2>
          <p className="text-center mb-6 ">
            Enter your username and password to Login.
          </p>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email Address"
              className="w-full p-2 border  rounded invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-pink-500 focus:invalid:outline-pink-500 "
              autoFocus
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-2 border  rounded invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-pink-500 focus:invalid:outline-pink-500"
            />
          </div>
          <button className="w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition">
            Sign In
          </button>
          <p className="mt-6 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link
              to={`/register?redirect=${encodeURIComponent(redirect)}`}
              className="text-blue-500 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>

      <div className="hidden md:block w-1/2 bg-gray-800">
        <div className="w-full flex flex-col justify-center items-center">
          <img
            src={login}
            alt="Login image"
            className="h-[750px] w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;