import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserProfilePhoto: (state, action) => {
      state.user.photoURL = action.payload;
    },
    updateUserDetails: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    setUserFriends: (state, action) => {
      state.user.friends = action.payload;
    },
    updateUserFriends: (state, action) => {
      state.user.friends = [...state.user.friends, action.payload];
    },
    setUserPosts: (state, action) => {
      state.user.posts = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = {};
    },
  },
});

export const {
  setAuth,
  setUser,
  logout,
  setUserProfilePhoto,
  updateUserDetails,
  setUserFriends,
  setUserPosts,
  updateUserFriends,
} = userSlice.actions;
export default userSlice.reducer;
