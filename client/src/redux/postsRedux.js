import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allPosts: [],
};

const postsSlice = createSlice({
  name: "Posts",
  initialState,
  reducers: {
    setAllPosts: (state, action) => {
      state.allPosts = action.payload;
    },
    deletePost: (state, action) => {
      state.allPosts = state.allPosts.filter(
        (post) => post.postID !== action.payload
      );
    },
  },
});

export const { setAllPosts, deletePost } = postsSlice.actions;
export default postsSlice.reducer;
