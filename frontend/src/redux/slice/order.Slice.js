import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// async thunk to fetch user orders
export const fetchUserOrders = createAsyncThunk(
  "orders/fetchUserOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders/myorders`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("UserToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// async thunk to fetch prders details by Id
export const fetchOrderDetails = createAsyncThunk(
  "orders/fetchOrderDetails",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("UserToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// create slice for orders
const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    orderDetails: null,
    loading: false,
    error: null,
    totalOrders:0
      },
      reducers: {},
      extraReducers: (builder) => {
        builder
          .addCase(fetchUserOrders.pending, (state) => {
            state.loading = true;
            state.error=null;
          })
          .addCase(fetchUserOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = action.payload;
          })
          .addCase(fetchUserOrders.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
          })

          // fetch order details
          .addCase(fetchOrderDetails.pending, (state) => {
            state.loading = true;
          })
          .addCase(fetchOrderDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.orderDetails = action.payload;
          })
          .addCase(fetchOrderDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          });
      },
    });
    
    export default orderSlice.reducer;
