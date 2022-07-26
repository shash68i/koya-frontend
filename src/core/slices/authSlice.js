import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import api from "../../utils/api";
import setAuthToken from "../../utils/setAuthToken";

const initialAuthState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: true,
  user: null,
};

// Register User Thunk
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (signupData, { rejectWithValue }) => {
    try {
      const response = await api.post("/users", signupData);
      return response.data;
    } catch (err) {
      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      // console.log(err.response.data.errors[0]);
      return rejectWithValue(err.response.data.errors[0]);
    }
  }
);

// Login User Thunk
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (loginData) => {
    const response = await api.post("/auth", loginData);
    localStorage.setItem("token", response.data.token);
    setAuthToken(localStorage.token);
    return response.data;
  }
);

export const loadUser = createAsyncThunk("auth/loadUser", async () => {
  const response = await api.get("/auth");
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    logout(state) {
      localStorage.removeItem("token");
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
    },
  },
  extraReducers: {
    [registerUser.fulfilled]: (state, { payload }) => {
      state.token = payload.token;
      state.loading = false;
      state.isAuthenticated = true;
      console.log(payload, "payload");
      setAuthToken(payload.token);
    },
    [registerUser.rejected]: (state, { payload }) => {
      toast.error(payload.msg);
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.token = payload;
      // console.log(payload, "payload");
    },
    [loginUser.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.loading = false;
      toast.error("Invalid credentials");
      // console.log(payload, "payload");
    },
    [loadUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.user = payload;
      state.isAuthenticated = true;
      console.log(payload, "payload");
    },
    [loadUser.rejected]: (state, { payload }) => {
      state.loading = false;
    },
  },
});

export default authSlice;
export const authActions = authSlice.actions;
