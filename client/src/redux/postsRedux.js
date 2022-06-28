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
  },
});

export const { setAllPosts } = postsSlice.actions;
export default postsSlice.reducer;
