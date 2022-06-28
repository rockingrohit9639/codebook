import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userRedux";
import postsReducer from "./postsRedux";

const rootReducer = combineReducers({ user: userReducer, posts: postsReducer });

export const store = configureStore({
  reducer: rootReducer,
});
