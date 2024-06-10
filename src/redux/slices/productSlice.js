import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
  });

const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        // loading: false,
        error: null,
    },
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        },
    },
    }
);



export default productSlice.reducer;