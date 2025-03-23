import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// asynck thunk to fetch products

export const fetchProductsByFilters = createAsyncThunk(
  "products/fetchByFilter",
  async ({
    collection,
    size, color,
    material,
    gender,
    maxPrice,
    minPrice,
    sortBy,
    search,
    category,
    brand,
    limit,
  }) => {
    const query = new URLSearchParams()
    if (collection) query.append('collection', collection)
    if (size) query.append('size', size)
    if (color) query.append('color', color)
    if (material) query.append('material', material)
    if (gender) query.append('gender', gender)
    if (maxPrice) query.append('maxPrice', maxPrice)
    if (minPrice) query.append('minPrice', minPrice)
    if (sortBy) query.append('sortBy', sortBy)
    if (search) query.append('search', search)
    if (category) query.append('category', category)
    if (brand) query.append('brand', brand)
    if (limit) query.append('limit', limit)

    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products?${query.toString()}`
    );
    return response.data;
  }
);

// async thunk to fetch product by id
export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`
    );
    return response.data;
  }
);