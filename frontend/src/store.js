import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./features/productsSlice";
import userSlice from "./features/userSlice";


const store = configureStore({
    reducer:{
        user: userSlice,
        products: productsSlice
    }
})

export default store