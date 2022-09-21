import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: true,
    products: [],
    singleProduct: {},
    error: false
}

export const fetchProducts = createAsyncThunk("products/fetchProducts", async (thunkAPI) => {
    console.log("hello");
    return "hello"
})


const fetchSingleProduct = createAsyncThunk("products/fetchSingleProduct", async (id, thunkAPI) => {

    try {
    const {data} = await axios.get(`/api/products/${id}`)
    return data
} catch (error) {
    thunkAPI.rejectWithValue(error)
}

})
 
//products
const productSlice = createSlice({
    name : "products",
    initialState,

    reducers:{

    },

    extraReducers: {
        [fetchProducts.pending]: (state) => {
            state.isLoading = true
        },
        [fetchProducts.fulfilled]: (state, action) => {
            state.isLoading = false
            state.products = payload
            console.log(action);
        },
        [fetchProducts.rejected]: (state, {payload})=>{
            state.isLoading = false
            state.error=payload
        },

          [fetchSingleProduct.pending]: (state) => {
            state.isLoading = true
        },
        [fetchSingleProduct.fulfilled]: (state, {payload}) => {
            state.isLoading = false
            state.singleProduct= payload
            console.log(payload);
        },
        [fetchSingleProduct.rejected]: (state, {payload})=>{
            state.isLoading = false
            state.error=payload
        }
    }

})


export default productSlice.reducer