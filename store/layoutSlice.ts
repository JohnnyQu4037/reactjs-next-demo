import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/store";

export interface LayoutState {
  isCollapsed: boolean;
}

const initialState: LayoutState = {
  isCollapsed: false,
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setCollapseStatus: (state, { payload }) => {
      state.isCollapsed = payload;
    },
  },
});

export const { setCollapseStatus } = layoutSlice.actions;

export const layout = (state: RootState) => state.layout;

export default layoutSlice.reducer;
