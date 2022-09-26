import { configureStore } from "@reduxjs/toolkit";
import orderSlice from "./features/orderSlice";
import productsSlice from "./features/productsSlice";
import userSlice from "./features/userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    products: productsSlice,
    orders: orderSlice,
  },
});
