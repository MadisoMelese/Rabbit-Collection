import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// fetch all products for admin
const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/admin/products`
const USER_TOKEN = `Bearer ${localStorage.getItem("UserToken")}`

export const fetchProducts = createAsyncThunk("admin/fetchProducts", async () => {
    const response = await axios.get(
      API_URL,
      {
        headers: {
          Authorization: USER_TOKEN,
        },
      }
    );
    return response.data;
});