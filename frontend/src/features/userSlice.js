import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";


const userInfoFromLocalStorage = localStorage.getItem("user")
? JSON.parse(localStorage.getItem("user"))
: null;

const initialState = {
    isLoading: true,
    user: userInfoFromLocalStorage,
    error: false
}

export const registerUser = createAsyncThunk("user/registerUser", async(newUser, thunkAPI) => {

    try{

        const config = {
            headers:{
                "Content-Type" : "application/json",

            },
        };
        const {data} = await axios.post(`/api/users`, newUser, config)
        return data
    }catch(error){
            thunkAPI.rejectWithValue("Something went wrong! Please try again.")
    }

})

export const loginUser = createAsyncThunk("user/loginUser", async(user, thunkAPI) => {

    try{

        const config = {
            headers:{
                "Content-Type" : "application/json",

            },
        };
        const {data} = await axios.post(`/api/users/login`, user, config)
        return data
    }catch(error){
            thunkAPI.rejectWithValue("Something went wrong! Please try again.")
    }

})

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        logoutUser: (state, action) =>{
            state.user = null
            localStorage.removeItem("user")
        }
    },
    extraReducers:{
        [registerUser.pending]: (state) => {
            state.isLoading = true
        },
        [registerUser.fulfilled]: (state, {payload})=>{
            const {user} = payload
            state.isLoading = false
            state.user = user
            localStorage.setItem("user", JSON.stringify(user))
        },
        [registerUser.rejected]: (state, {payload})=>{
            state.isLoading = false
            state.error = true
        },
        [loginUser.pending]: (state) =>{
            state.isLoading = true
        },
        [loginUser.fulfilled]: (state, {paylaod}) =>{
            state.isLoading = false
            state.user = paylaod.user
            localStorage.setItem("user", JSON.stringify(paylaod.user))
        },
        [loginUser.rejected]: (state, {payload})=>{
            state.isLoading = false
            state.error = true
        }
    }
})



export default userSlice.reducer