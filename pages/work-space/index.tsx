import React, { useEffect } from "react";
import GridLayout from "react-grid-layout";
import styled from "styled-components";
import BookFundPerformance from "@/components/chartTemplate/BookFundPerformance";
import LpFlow from "@/components/chartTemplate/LpFlow";
import LpFlowBySecurity from "@/components/chartTemplate/LpFlowBySecurity";
import { getPkBook } from "@/api/book";
import { useDispatch, useSelector } from "react-redux";
import { setBookOptions } from "@/store/bookSlice";
import { layout, setChartLayout } from "@/store/layoutSlice";
import useWindowSize from "@/utils/window-size";

const GridItem = styled.div`
  padding: 5px;
  background: grey;
`;

const WorkSpace = () => {
  const dispatch = useDispatch();
  const layoutState = useSelector(layout);

  const windowSize = useWindowSize();

  const generateDOM = () => {
    return layoutState.chartLayout.map(({ i, h }) => {
      const type = i.split("_")[0];
      switch (type) {
        case "LpFlow":
          return (
            <GridItem key={i}>
              <div style={{ height: "100%", width: "100%" }} className="text">
                <LpFlow chartId={i} height={h - 65} />
              </div>
            </GridItem>
          );
        case "LpFlowBySecurity":
          return (
            <GridItem key={i}>
              <div style={{ height: "100%", width: "100%" }} className="text">
                <LpFlowBySecurity chartId={i} height={h - 65} />
              </div>
            </GridItem>
          );
        case "BookFundPerformance":
          return (
            <GridItem key={i}>
              <div style={{ height: "100%", width: "100%" }} className="text">
                <BookFundPerformance chartId={i} height={h - 65} />
              </div>
            </GridItem>
          );
        default:
          return null;
      }
    });
  };

  const onLayoutChange = (newPosition: any) => {
    dispatch(setChartLayout(newPosition));
  };
  const onResize = (chartLayout: any) => {
    dispatch(setChartLayout(chartLayout));
  };

  useEffect(() => {
    getPkBook().then((data) => {
      dispatch(setBookOptions(data));
    });
  }, []);

  return (
    <>
      <GridLayout
        width={windowSize.width - (layoutState.isCollapsed ? 150 : 270)}
        layout={layoutState.chartLayout}
        cols={36}
        rowHeight={1}
        useCSSTransforms={true}
        margin={[0, 0]}
        verticalCompact={false}
        onLayoutChange={onLayoutChange}
        onResize={onResize}
      >
        {generateDOM()}
      </GridLayout>
    </>
  );
};
export default WorkSpace;
