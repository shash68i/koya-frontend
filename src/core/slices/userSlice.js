import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/api";

const initialUserState = {
  myProfile: null,
  userProfile: {},
  userPosts: [],
  usersProfile: [],
  loading: true,
  error: {},
};

export const getMyProfile = createAsyncThunk("user/getMyProfile", async () => {
  const response = await api.get("/profile/me");
  return response.data;
});

export const updateMyProfile = createAsyncThunk(
  "user/updateMyProfile",
  async (profileData) => {
    const response = await api.post("/profile", profileData);
    return response.data;
  }
);

// export const getMyPosts = createAsyncThunk("user/getMyPosts", async (user) => {
//   const response = await api.get(`/posts/user/${user._id}`);
//   return response.data;
// });

export const getUserPosts = createAsyncThunk(
  "user/getUserPosts",
  async (id) => {
    const response = await api.get(`/posts/user/${id}`);
    return response.data;
  }
);

export const getUserProfile = createAsyncThunk(
  "user/getUserProfile",
  async (id) => {
    const response = await api.get(`/profile/user/${id}`);
    return response.data;
  }
);

// export const updateMyLikes = createAsyncThunk(
//   "posts/updateMyLikes",
//   async (postId) => {
//     const response = await api.put(`/posts/like-unlike/${postId}`);
//     return { id: postId, data: response.data };
//   }
// );

export const updateUserLikes = createAsyncThunk(
  "posts/updateUserLikes",
  async (postId) => {
    const response = await api.put(`/posts/like-unlike/${postId}`);
    return { id: postId, data: response.data };
  }
);

// export const getAllProfiles = createAsyncThunk("auth/getAllProfiles", async (state, postData) => {
//   const response = await api.post("/profile");
//   return response.data;
// });

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    updateUserPosts: (state, { payload }) => {
      state.myPosts = [payload, ...state.myPosts];
    },
    clearProfile: (state) => {
      state.myProfile = null;
      state.myPosts = null;
    },
  },
  extraReducers: {
    [getMyProfile.fulfilled]: (state, { payload }) => {
      state.myProfile = payload;
      state.loading = false;
    },
    [getUserProfile.fulfilled]: (state, { payload }) => {
      state.userProfile = payload;
      state.loading = false;
    },
    [updateMyProfile.fulfilled]: (state, { payload }) => {
      state.myProfile = payload;
      state.loading = false;
      state.isProfileCreated = true;
    },
    [getUserPosts.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [getUserPosts.fulfilled]: (state, { payload }) => {
      state.userPosts = payload;
      state.loading = false;
    },
    [updateUserLikes.fulfilled]: (state, { payload }) => {
      state.userPosts = [
        ...state.userPosts.map((post) => {
          return post._id === payload.id
            ? { ...post, likes: [...payload.data] }
            : post;
        }),
      ];
      state.loading = false;
    },
  },
});

export default userSlice;
export const userActions = userSlice.actions;
