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
      state.isAuthenticated = action.payload
    },
    setUser: (state, action) => {
      state.user = action.payload
    }
  }
}); 

export const { setAuth, setUser } = userSlice.actions;
export default userSlice.reducer;
