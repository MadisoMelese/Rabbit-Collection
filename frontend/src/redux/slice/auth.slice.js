import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

// retrieve user info and token from local storage
const userFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

// checking for an existing guest ID in the localStorage or generate new one