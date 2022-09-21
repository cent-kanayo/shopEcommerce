// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";


// const initialState = {
//     isLoading: true,
//     cart: [],
//     products:[]
// }

// export const fetchProducts = createAsyncThunk("cart/fetchProducs", async (thunkAPI) =>{
//     try {
//        const {data} = axios.get("https://localhost:5000") 
//        return data
//     } catch (error) {
//         thunkAPI.rejectWithValue(error.message)
//     }
// })

// const cartSlice = createSlice({
//     name: "cart",
//     initialState,
//     reducers:{
//         addTocart: (state, action) =>{
//             state.cart.push(action.payload)
//         },
//         removeFromCart: (state, {payload})=>{
//             const newItem = state.cart.find(item => item.id === payload)
//             state.cart.filter(item => item.id !== newItem.id)
//         }
//     },
//     extraReducers:{
//         [fetchProducts.pending]: (state) => {
//             state.isLoading = true
//         },
//         [fetchProducts.fulfilled]: (state, action)=>{
//             state.products = action.payload
//             state.isLoading = false
//         },
//         [fetchProducts.rejected] : (state, {payload})=>{
//             state.isLoading = false
//             console.log(payload)
//         }
//     }
// })
// export const {addTocart, removeFromCart} = cartSlice.actions

// export default cartSlice.reducer