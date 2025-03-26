import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// fetch all the orders
export const fetchAllOrders = createAsyncThunk("admin/fetchAllOrders", async (_, {rejectWithValue}) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("UserToken")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error in fetch orders through: ", error);
    return rejectWithValue(error.response.data);
  }
});

// update order delivery status
export const updateOrderStatus = createAsyncThunk("admin/updateOrderStatus", async ({id, status}, {rejectWithValue}) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders${id}`,
      {status},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("UserToken")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error in update order status through: ", error);
    return rejectWithValue(error.response.data);
  }
});

// delete order
export const deleteOrder = createAsyncThunk("admin/deleteOrder", async (id, {rejectWithValue}) => {
  try {
await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("UserToken")}`,
        },
      }
    );
    return id;
  } catch (error) {
    console.error("Error in delete order through: ", error);
    return rejectWithValue(error.response.data);
  }
});

const adminOrderSlice = createSlice({
  name: "adminOrder",
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: ()