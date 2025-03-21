import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './slice/auth.slice.js';
const store = configureStore({
  reducer: {
  auth: AuthReducer,
  },
});

export default store;
