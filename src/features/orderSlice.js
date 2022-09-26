import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { logoutUser } from "./userSlice";

const storeInLocalStorage = (item, cartItem) => {
  localStorage.setItem(item, JSON.stringify(cartItem));
  let data = localStorage.getItem(item);
  let cart = [];
  data = data ? JSON.parse(data) : null;
  cart.push(data);
  console.log(cart);
  return data;
};

const initialState = {
  cart: [],
  totalPrice: 0,
  shippingFee: 0,
  orderPrice: 0,
  paymentMehtod: "",
  shippingAddress: {
    city: "",
    postalCode: "",
    address: "",
    country: "",
  },
  totalAmount: 0,
  success: false,
  isLoading: false,
  error: false,
  errorMsg: "",
};

export const placeOrder = createAsyncThunk(
  "/orders/placeOrder",
  async (order, thunkAPI) => {
    try {
      const { user } = thunkAPI.getState().user;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(`/api/orders`, order, config);
      return data;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        thunkAPI.dispatch(logoutUser());
      }

      thunkAPI.rejectWithValue(message);
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      const { product, qty } = payload;
      const cartItem = { ...product, amount: Number(qty) };
      state.cart.push({ ...cartItem, amount: qty });
      storeInLocalStorage("cart", JSON.stringify(cartItem));
      state.totalAmount = state.cart.reduce(
        (acc, item) => (acc += item.amount),
        0
      );
      state.totalPrice = state.cart.reduce(
        (acc, item) => (acc += item.amount * item.price),
        0
      );
    },
    saveShippingAddress: (state, { payload }) => {
      const { city, address, country, postalCode } = payload;
      state.shippingAddress.address = address;
      state.shippingAddress.city = city;
      state.shippingAddress.country = country;
      state.shippingAddress.postalCode = postalCode;
    },
  },
  extraReducers: {
    [placeOrder.pending]: (state) => {
      state.isLoading = true;
    },
    [placeOrder.fulfilled]: (state) => {
      state.isLoading = false;
      state.success = true;
    },
    [placeOrder.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = true;
      state.errorMsg = payload;
    },
  },
});

export const { addToCart, saveShippingAddress } = orderSlice.actions;

export default orderSlice.reducer;
