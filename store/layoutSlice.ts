import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/store";

export interface LayoutState {
  isCollapsed: boolean;
  chartLayout: {
    i: string;
    x: number;
    y: number;
    w: number;
    h: number;
    minW: number;
    minH: number;
  }[];
}

const initialState: LayoutState = {
  isCollapsed: false,
  chartLayout: [
    { i: "LpFlow_1", x: 0, y: 0, w: 12, h: 600, minW: 12, minH: 200 },
    { i: "LpFlowBySecurity_2", x: 12, y: 0, w: 12, h: 600, minW: 12, minH: 200 },
    { i: "BookFundPerformance_3", x: 24, y: 0, w: 12, h: 600, minW: 12, minH: 200 },
  ],
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setCollapseStatus: (state, { payload }) => {
      state.isCollapsed = payload;
    },
    setChartLayout: (state, { payload }) => {
      state.chartLayout = payload;
    },
  },
});

export const { setCollapseStatus, setChartLayout } = layoutSlice.actions;

export const layout = (state: RootState) => state.layout;

export default layoutSlice.reducer;
