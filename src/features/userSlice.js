import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const getUserFromLocalStorage = () => {
  const result = localStorage.getItem("user");
  const user = result ? JSON.parse(result) : null;
  return user;
};

const initialState = {
  isLoading: false,
  user: getUserFromLocalStorage(),
  error: false,
  errorMsg: "",
};

export const createUser = createAsyncThunk(
  "user/registerUser",
  async (newUser, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `http://localhost:5000/api/users`,
        newUser,
        config
      );
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `http://localhost:5000/api/users/login`,
        user,
        config
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (newUser, thunkAPI) => {
    try {
      const { user } = thunkAPI.getState().user;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(`/api/users/profile`, newUser, config);
      return data;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: {
    [createUser.pending]: (state) => {
      state.isLoading = true;
    },
    [createUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.user = payload;
      localStorage.setItem("user", JSON.stringify(payload));
    },
    [createUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = true;
      state.errorMsg = payload;
    },
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.user = payload;
      localStorage.setItem("user", JSON.stringify(payload));
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = true;
      state.errorMsg = payload;
    },
    [updateUser.pending]: (state) => {
      state.isLoading = true;
    },
    [updateUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.user = payload;
      localStorage.setItem("user", JSON.stringify(payload));
    },
    [updateUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = true;
      state.errorMsg = payload;
    },
  },
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
