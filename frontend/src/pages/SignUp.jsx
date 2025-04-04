import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import register from "../assets/register.webp";
import { registerUser } from "../redux/slice/auth.slice.js";
import { useDispatch, useSelector } from "react-redux";
import { mergeCart } from "../redux/slice/cart.Slice.js";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  // Fetch user and guest cart data from Redux store
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  // Ensuring redirect is always a string
  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  const isCheckoutRedirect = String(redirect).includes("checkout");

  // Effect hook to handle redirect after user is registered
  useEffect(() => {
    if (user) {
      // Merge cart for the logged-in user if there are items in the cart
      if (cart?.products?.length > 0 && guestId) {
        dispatch(mergeCart({ guestId, user })).then(() => {
          navigate(redirect, { replace: true });
        });
      } else {
        navigate(redirect, { replace: true });
      }
    }
  }, [user, guestId, cart, redirect, dispatch, navigate]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password }));
  };

  return (
    <div className="flex">
      {/* Form Section */}
      <div className="w-full flex md:w-1/2 flex-col justify-center items-center p-8 md:p-12">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-8 rounded-lg border border-gray-500 shadow-sm"
        >
          <div className="flex justify-center mb-6">
            <h2 className="text-xl font-medium">Rabbit</h2>
          </div>
          <h2 className="text-2xl font-bold text-center mb-6">Hey there! 👋</h2>
          <p className="text-center mb-6">Enter all necessary info to create a new account.</p>

          {/* Full Name Input */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Fullname</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your Fullname"
              className="w-full p-2 border border-gray-500 rounded"
              autoFocus
            />
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full p-2 border border-gray-500 rounded"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-2 border border-gray-500 rounded"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition capitalize"
          >
            Sign Up
          </button>

          {/* Redirect to Login if already have an account */}
          <p className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link
              to={`/login?redirect=${encodeURIComponent(redirect)}`}
              className="text-blue-500 hover:underline"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>

      {/* Image Section for SignUp */}
      <div className="hidden md:block w-1/2 bg-gray-800">
        <div className="w-full flex flex-col justify-center items-center">
          <img
            src={register}
            alt="Sign up image"
            className="h-[750px] w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
