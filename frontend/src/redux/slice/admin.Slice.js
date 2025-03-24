import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// fetch all the users

export const fetchUsers = createAsyncThunk("admin/fetchUsers", async (_, {rejectWithValue}) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("UserToken")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error in fetch users through: ", error);
    return rejectWithValue(error.response.data);
  }
});

// add the crate user action

export const addUser = createAsyncThunk("admin/addUser", async (userData, {rejectWithValue}) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/admin/createUser`,
      userData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("UserToken")}`,
        },
      });
    return response.data;
  } catch (error) {
    console.error("Error in create user through: ", error);
    return rejectWithValue(error.response.data);
  }
})

// update user info through admin panel

export const updateUser = createAsyncThunk("admin/updateUser", async ({id, name, email, role}, {rejectWithValue}) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,
      {name, email, role},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("UserToken")}`,
        },
      }); 
    return response.data;
  } catch (error) { 
    console.error("Error in update user through: ", error);
    return rejectWithValue(error.response.data);
  }
})

// delete user through admin panel

export const deleteUser = createAsyncThunk("admin/deleteUser", async (id, {rejectWithValue}) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("UserToken")}`,
        },
      }); 
    return response.data; 
  } catch (error) {
    console.error("Error in delete user through: ", error);
    return rejectWithValue(error.response.data);
  }
})

// get single user info through admin panel

export const fetchSingleUser = createAsyncThunk("admin/fetchSingleUser", async (id, {rejectWithValue}) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("UserToken")}`,
        },  
      });
    return response.data;
  } catch (error) {
    console.error("Error in fetch single user through: ", error);
    return rejectWithValue(error.response.data);
  }
})

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    singleUser:{},
    loading: false,
    error:null,
  },
  reducers: {},
  extraReducers: (builder) =>{
    builder
    // fetching users
    .addCase(fetchUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    })
    .addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    })

// update user info through admin panel
    .addCase(updateUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(updateUser.fulfilled, (state, action) => {
      const updetedUser = action.payload;
      const userIndex = state.users.findIndex((user) => user._id === updetedUser._id);
      if (userIndex ==! -1) {
        state.users[userIndex] = updetedUser;
      }
    })
    .addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    })

    // delete user through admin panel
    .addCase(deleteUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(deleteUser.fulfilled, (state, action) => {
      const deletedUserId = action.payload;
      state.users = state.users.filter((user) => user._id !== deletedUserId);
    })
    .addCase(deleteUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    })

    // add user through admin panel
    .addCase(addUser.pending, (state)=>{
      state.loading = true;
      state.error = null;
    })
    .addCase(addUser.fulfilled, (state, action)=>{
      state.loading = false;
      state.users.push(action.payload.user); // add the new user to the users
    })
    .addCase(addUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    })

    // get single user info through admin panel
    .addCase(fetchSingleUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchSingleUser.fulfilled, (state, action) => {
      state.loading = false;
      state.singleUser = action.payload;
    })
    .addCase(fetchSingleUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    })
  },

})
export default adminSlice.reducer;