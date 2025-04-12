import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './slice/auth.slice.js';
import productReducer from './slice/products.slice.js';
import cartReducer from './slice/cart.Slice.js';
import checkoutReducer from './slice/checkout.Slice.js';
import orderReducer from './slice/order.Slice.js';
import adminReducer from './slice/admin.Slice.js';
import adminProductReducer from './slice/admin.product.Slice.js';
import aminOrdersReducer from './slice/adminOrder.Slice.js'; 

const store = configureStore({
  reducer: {
  auth: AuthReducer,
  products: productReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
  orders:orderReducer,
  admin: adminReducer,
  adminProducts: adminProductReducer,
  adminOrders: aminOrdersReducer,
  },

});

export default store;
