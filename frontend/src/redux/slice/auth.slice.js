import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

// retrieve user info and token from local storage
const userFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

// checking for an existing guest ID in the localStorage or generate new one

const intialGuestId = localStorage.getItem('guestId') || `guest_${new Date().getTime()}`;
localStorage.setItem ('guestId', intialGuestId);

// initial state

const initialState = {
  userInfo: userFromStorage,
  guestId: intialGuestId,
  loading: false,
  error: null,
};

// async thunk to login user

export const loginUser = createAsyncThunk("auth/loginUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, userData);
    localStorage.setItem('userInfo', JSON.stringify(response.data.user));
    localStorage.setItem('UserToken', response.data.token);

    return response.data.user;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// async thunk to register user
export const registerUser = createAsyncThunk("auth/registerUser", async (userData, { rejectWithValue }) => {
  try {
    const response = 
    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, userData);
    localStorage.setItem('userInfo', JSON.stringify(response.data.user));
    localStorage.setItem('UserToken', response.data.token);

    return response.data.user;
  }  catch (error) {
    return rejectWithValue(error.response.data);
  }
});


// slice for auth

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user=null;
      state.guestId= `guest_${new Date().getTime()}`;
      localStorage.removeItem('userInfo');
      localStorage.removeItem('UserToken');
      localStorage.setItem('guestId', state.guestId);
    },
    generateNewGuestId: (state) => {
      state.guestId = `guest_${new Date().getTime()}`;
      localStorage.setItem('guestId', state.guestId);
    },
  },

  extraReducers: (builder) =>{
    builder
    .addCase(loginUser.pending, (state) => {
      state.loading = true,
      state.error = null
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false,
      state.error = action.payload
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.loading = true,
      state.error = action.payload.message
    })
    .addCase(registerUser.pending, (state) => {
      state.loading = true,
      state.error = null
    })
    .addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false,
      state.error = action.payload
    })
    .addCase(registerUser.rejected, (state, action) => {
      state.loading = true,
      state.error = action.payload.message
    })
  }
})

export const { logoutUser, generateNewGuestId } = authSlice.actions;
export default authSlice.reducer;