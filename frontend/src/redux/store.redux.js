import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './slice/auth.slice.js';
import productReducer from './slice/products.slice.js';
import cartReducer from './slice/cart.Slice.js';
import checkoutReducer from './slice/checkout.Slice.js';

const store = configureStore({
  reducer: {
  auth: AuthReducer,
  products: productReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
  },
});

export default store;
