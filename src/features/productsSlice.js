import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  products: [],
  singleProduct: {},
  error: false,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (thunkAPI) => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/products");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const fetchSingleProduct = createAsyncThunk(
  "products/fetchSingleProduct",
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/products/${id}`
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const postSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: {
    [fetchProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchProducts.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.products = payload;
    },

    [fetchSingleProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchSingleProduct.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.singleProduct = payload;
    },
  },
});

export default postSlice.reducer;
