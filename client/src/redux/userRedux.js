import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    // User Details
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

    // User Posts
    setUserPosts: (state, action) => {
      state.user.posts = action.payload;
    },

    // User Friends
    setUserFriends: (state, action) => {
      state.user.friends = action.payload;
    },

    addUserFriend: (state, action) => {
      state.user.friends = [...state.user.friends, action.payload];
    },

    removeUserFriend: (state, action) => {
      state.user.friends = state.user.friends.filter(
        (friend) => friend.uid !== action.payload
      );
    },

    // Logout
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
  addUserFriend,
  removeUserFriend,
} = userSlice.actions;
export default userSlice.reducer;
