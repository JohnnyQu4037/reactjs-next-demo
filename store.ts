import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./store/bookSlice";
import layoutReducer from "./store/layoutSlice";

export const store = configureStore({
  reducer: {
    book: bookReducer,
    layout: layoutReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
