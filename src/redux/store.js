import { configureStore } from "@reduxjs/toolkit";
import ratingReducer from "./rating/ratingSlice";

const store = configureStore({
  reducer: {
    rating: ratingReducer
  }
});

export default store;
