import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import api from "../../utils/api";

const initialPostState = {
  posts: [],
  myPosts: [],
  filteredPosts: null,
  isLiked: false,
  post: null,
  page: 1,
  fetched: false,
  loading: true,
  error: {},
};

export const getPosts = createAsyncThunk("post/getPosts", async (page) => {
  const response = await api.get(`/posts?page=${page}`);
  return response.data;
});

export const getPost = createAsyncThunk("post/getPost", async (id) => {
  const response = await api.get(`/posts/${id}`);
  return response.data;
});

export const getMyPosts = createAsyncThunk("user/getMyPosts", async (user) => {
  const response = await api.get(`/posts/user/${user._id}`);
  return response.data;
});

export const getPostsByLocation = createAsyncThunk(
  "post/getPostsByLocation",
  async (location) => {
    const response = await api.get(`/posts/location/${location}`);
    return response.data;
  }
);

export const addPost = createAsyncThunk("posts/addPost", async (postData) => {
  console.log(postData, "postData");
  const response = await api.post("/posts", postData);
  return response.data;
});

export const updateLikes = createAsyncThunk(
  "posts/updateLikes",
  async (postId) => {
    const response = await api.put(`/posts/like-unlike/${postId}`);
    return { id: postId, data: response.data };
  }
);

export const updateMyLikes = createAsyncThunk(
  "posts/updateMyLikes",
  async (postId) => {
    const response = await api.put(`/posts/like-unlike/${postId}`);
    return { id: postId, data: response.data };
  }
);

export const addComment = createAsyncThunk(
  "posts/addComment",
  async ({ postId, commentData }) => {
    const response = await api.post(`/posts/comment/${postId}`, commentData);

    return response.data;
  }
);

const postSlice = createSlice({
  name: "post",
  initialState: initialPostState,
  reducers: {
    isPostsFetched(state, action) {
      state.fetching = action.payload;
    },
    infiniteScrollAddPage(state) {
      state.page = state.page + 1;
    },
  },
  extraReducers: {
    [getPosts.fulfilled]: (state, { payload }) => {
      state.posts = state.posts.concat(payload);
      state.fetched = payload.length === 0;
      state.loading = false;
    },
    [getPost.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [getPost.fulfilled]: (state, { payload }) => {
      state.post = payload;
      state.loading = false;
    },
    [getMyPosts.pending]: (state) => {
      state.loading = true;
    },
    [getMyPosts.fulfilled]: (state, { payload }) => {
      state.myPosts = payload;
      state.loading = false;
    },
    [addPost.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [addPost.fulfilled]: (state, { payload }) => {
      state.posts = [payload, ...state.posts];
      state.myPosts = [payload, ...state.myPosts];
      state.loading = false;
    },
    [updateLikes.fulfilled]: (state, { payload }) => {
      state.posts = [
        ...state.posts.map((post) => {
          return post._id === payload.id
            ? { ...post, likes: [...payload.data] }
            : post;
        }),
      ];

      state.post = { ...state.post, likes: [...payload.data] };
      state.loading = false;
    },
    [updateMyLikes.fulfilled]: (state, { payload }) => {
      state.myPosts = [
        ...state.myPosts.map((post) => {
          return post._id === payload.id
            ? { ...post, likes: [...payload.data] }
            : post;
        }),
      ];
      state.loading = false;
    },
    [addComment.fulfilled]: (state, { payload }) => {
      state.post = { ...state.post, comments: payload };
      state.loading = false;
      console.log(state.post, "comments post");
    },
    [getPostsByLocation.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [getPostsByLocation.fulfilled]: (state, { payload }) => {
      console.log(payload, "payload");
      state.filteredPosts = payload;
      state.loading = false;
      state.fetched = false;
    },
  },
});

export default postSlice;
export const postActions = postSlice.actions;
