// import {createStore, combineReducers, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
// import composeWithDevTools from "redux-devtools-extension";
// import  {productListReducer}  from "./Reducers/ProductReducers";

// const reducer = combineReducers({
//     productList : productListReducer,
// });

// const initialState = {};
// const middleware = [thunk];

// const store = createStore(
//     reducer,
//     initialState,
//     composeWithDevTools(applyMiddleware(...middleware))
// );

import { configureStore } from '@reduxjs/toolkit'
import { cartReducer } from './Reducers/CartReducers';
import { orderCreateReducer } from './Reducers/OrderReducers';
// import cartSlice from './Reducers/cartSlice';
import  {productDetailsReducer, productListReducer}  from "./Reducers/ProductReducers";
import { userDetailsReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer } from './Reducers/UserReducers';



//login
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
? JSON.parse(localStorage.getItem("userInfo"))
: null;

// shippingAddress
const shippingAddressFromLocalStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};


//cartItem
const cartItemsFromLocalStorage = localStorage.getItem("cartItem")
? JSON.parse(localStorage.getItem("cartItem"))
: [];

const initialState = {
  cart:{
    // itemsPrice: 0,
    // shippingPrice: 0,
    // taxPrice: 0,
    // totalPrice: 0,
    cartItems : cartItemsFromLocalStorage,
    shippingAddress: shippingAddressFromLocalStorage,
    },

  userLogin :{
  
    userInfo : userInfoFromLocalStorage,
  },
  
  
}

const store = configureStore({
  reducer: {
      productList:productListReducer,
      productDetails:productDetailsReducer,
      cart : cartReducer,
      userLogin : userLoginReducer,
      userRegister : userRegisterReducer,
      userDetails : userDetailsReducer,
      userUpdateProfile: userUpdateProfileReducer,
      orderCreate: orderCreateReducer,
      // cart: cartSlice
    // Define a top-level state field named `todos`, handled by `todosReducer`
    //todos: todosReducer,
    //filters: filtersReducer
  },
  //prealoadedState ,
   initialState,
});


export default store;
