import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/store";

export interface BookState {
  bookOptions: BOOK.bookOptions[];
}

const initialState: BookState = {
  bookOptions: [],
};

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setBookOptions: (state, { payload }) => {
      state.bookOptions = payload;
    },
  },
});

export const { setBookOptions } = bookSlice.actions;

export const book = (state: RootState) => state.book;

export default bookSlice.reducer;
