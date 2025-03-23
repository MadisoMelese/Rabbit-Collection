import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// asynck thunk to fetch products

export const fetchProductsByFilters = createAsyncThunk(
  "products/fetchByFilter",
  async ({
    collection,
    size,
    color,
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
    const query = new URLSearchParams();
    if (collection) query.append("collection", collection);
    if (size) query.append("size", size);
    if (color) query.append("color", color);
    if (material) query.append("material", material);
    if (gender) query.append("gender", gender);
    if (maxPrice) query.append("maxPrice", maxPrice);
    if (minPrice) query.append("minPrice", minPrice);
    if (sortBy) query.append("sortBy", sortBy);
    if (search) query.append("search", search);
    if (category) query.append("category", category);
    if (brand) query.append("brand", brand);
    if (limit) query.append("limit", limit);

    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products?${query.toString()}`
    );
    return response.data;
  }
);

// async thunk to fetch product by id
export const fetchProductDetails = createAsyncThunk(
  "products/fetchProductDetails",
  async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`
    );
    return response.data;
  }
);

// async thunk for updating products
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, productData }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
      productData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );
    return response.data;
  }
);

// async thunk to fetch similar products
export const fetchSimilarProducts = createAsyncThunk(
  "products/fetchSimilarProducts",
  async ({ id }) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/similarProduct/${id}`
    );

    return response.data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    error: null,
    selectedProduct: null,
    similarProducts: [],
    filters: {
      collection: "",
      size: "",
      color: "",
      material: "",
      brand: "",
      minPrice: "",
      maxPrice: "",
      sortBy: "",
      search: "",
      category: "",
      gender: "",
    },
  },
  reducers: {
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        collection: "",
        size: "",
        color: "",
        material: "",
        brand: "",
        minPrice: "",
        maxPrice: "",
        sortBy: "",
        search: "",
        category: "",
      };
    },
  },
  extraReducers:(builder) =>{
    builder
    .addCase(fetchProductsByFilters.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchProductsByFilters.fulfilled, (state, action) => {
      state.loading = false;
      state.products = Array.isArray(action.payload) ? action.payload : [];
    })
    .addCase(fetchProductsByFilters.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })

    // handle fetch product details
    .addCase(fetchProductDetails.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchProductDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedProduct = action.payload;
  })
    .addCase(fetchProductDetails.rejected, (state, action) => {
      state.loading = false;
      state.selectedProduct = action.error.message;
  })

  // handle update product
  .addCase(updateProduct.pending, (state) => {
    state.loading = true;
    state.error = null;
  })
  .addCase(updateProduct.fulfilled, (state, action) => {
    const updatedProduct = action.payload;
    const index = state.products.findIndex(
      (product) => product._id === updatedProduct._id
    );
    if (index !== -1) {
      state.products[index] = updatedProduct;
      
    }
  })
  .addCase(updateProduct.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message;
  })

  // handle fetch similar products
  .addCase(fetchSimilarProducts.pending, (state) => {
    state.loading = true;
    state.error = null;
  })
  .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
    state.loading = false;
    state.products = action.payload ;
  })
  .addCase(fetchSimilarProducts.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message;
  })
},
});


export const { setFilters, clearFilters } = productsSlice.actions;
export default productsSlice.reducer;