import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// helper func to load cart form local storage
const loadCartFromStorage = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(localStorage.getItem(storedCart)) : { products: [] };  
};

// helper func to save cart to local storage
const saveCartToStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// fetch cart items for a user or guest
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async ({userId, guestId}, {rejectWithValue}) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        {
          params:{
            userId,
            guestId
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error)
      return rejectWithValue(error.response.data);
    }
  }
);

// add an item to the cart  for user or guest

export const addToCart = createAsyncThunk("cart/addToCart", async ({userId, guestId, productId, quantity, size, color}, {rejectWithValue}) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {userId, guestId, productId, quantity, size, color});
    return response.data;
  } catch (error) {
    console.error(error);
    return rejectWithValue(error.response.data);
  }
})

// update quantity of an item in the cart
export const updateCartItemQuantity = createAsyncThunk("cart/updateCartItemQuantity", async ({userId, guestId, productId, quantity, color, size}, rejectWithValue) => {
  try {
    const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {userId, guestId, productId, quantity, size, color});
    return response.data;
  } catch (error) {
    console.error(error);
    return rejectWithValue(error.response.data);
  }
})

// remove an item from the cart
export const removeFromCart = createAsyncThunk("cart/removeFromCart", async ({productId, guestId, userId, size, color}, {rejectWithValue}) => {
  try {
    const response = await axios({
      method: "DELETE",
      url: `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
      data: {productId, guestId, userId, size, color},
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return rejectWithValue(error.response.data);
  }
})

// merge cart for user
export const mergeCart = createAsyncThunk("cart/mergeCart", async ({userId, guestId}, {rejectWithValue}) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`, {userId, guestId},
      {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return rejectWithValue(error.response.data);
  }
})  

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart : loadCartFromStorage(),
    loading: false,
    error:null,
  },
  reducers: {
    clearCart: (state) => {
      state.cart = {products: []};
      localStorage.removeItem("cart");
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchCart.pending, (state) => {
      state.loading = true;
      state.error=null;
    })
    .addCase(fetchCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cart=action.payload;
      saveCartToStorage(action.payload)
    })
    .addCase(fetchCart.rejected, (state, action) => {
      state.loading = false;
      state.error=action.error.message || "Failed to fetch cart";
    })
    
    .addCase(addToCart.pending, (state) => {
      state.loading = true;
      state.error=null;
    })
    .addCase(addToCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cart=action.payload;
      saveCartToStorage(action.payload)
    })
    .addCase(addToCart.rejected, (state, action) => {
      state.loading = false;
      state.error=action.payload?.message || "Failed add to  cart";
    })
    
    .addCase(updateCartItemQuantity.pending, (state) => {
      state.loading = true;
      state.error=null;
    })
    .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
      state.loading = false;
      state.cart=action.payload;
      saveCartToStorage(action.payload)
    })
    .addCase(updateCartItemQuantity.rejected, (state, action) => {
      state.loading = false;
      state.error=action.payload?.message || "Failed to update quantity";
    })
    
    .addCase(removeFromCart.pending, (state) => {
      state.loading = true;
      state.error=null;
    })
    .addCase(removeFromCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cart=action.payload.cart;
      saveCartToStorage(action.payload)
    })
    .addCase(removeFromCart.rejected, (state, action) => {
      state.loading = false;
      state.error=action.payload?.message || "Failed to remove item from cart";
    })
    
    .addCase(mergeCart.pending, (state) => {
      state.loading = true;
      state.error=null;
    })
    .addCase(mergeCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cart=action.payload;
      saveCartToStorage(action.payload)
    })
    .addCase(mergeCart.rejected, (state, action) => {
      state.loading = false;
      state.error=action.payload?.message || "Failed to merge cart";
    })
    
  },
});

export const { clearCart } = cartSlice.actions;

export default cartSlice.reducer;