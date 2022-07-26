import { configureStore, createSlice } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice";
import postSlice from "../slices/postSlice";
import userSlice from "../slices/userSlice";


const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    post: postSlice.reducer,
    user: userSlice.reducer,
    
  },
});



export default store;
