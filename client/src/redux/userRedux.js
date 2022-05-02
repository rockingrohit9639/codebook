import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  email: "",
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuthenticated = action.payload
    }
  }
}); 

export const { setAuth } = userSlice.actions;
export default userSlice.reducer;
