import React, { useEffect, useState } from "react";
import GridLayout from "react-grid-layout";
import styled from "styled-components";
import { Button } from "antd";
import BookFundPerformance from "@/components/chartTemplate/BookFundPerformance";
import LpFlow from "@/components/chartTemplate/LpFlow";
import LpFlowBySecurity from "@/components/chartTemplate/LpFlowBySecurity";
import { getPkBook } from "@/api/book";
import { useDispatch, useSelector } from "react-redux";
import { setBookOptions } from "@/store/bookSlice";
import { layout } from "@/store/layoutSlice";
import useWindowSize from "@/utils/window-size";

const GridItem = styled.div`
  padding: 5px;
  background: grey;
`;

const WorkSpace = () => {
  const dispatch = useDispatch();
  const layoutState = useSelector(layout);

  const windowSize = useWindowSize();

  const [chartLayout, setChartLayout] = useState([
    { i: "LpFlow_1", x: 0, y: 0, w: 12, h: 600, minW: 12, minH: 200 },
    { i: "LpFlowBySecurity_2", x: 12, y: 0, w: 12, h: 600, minW: 12, minH: 200 },
    { i: "BookFundPerformance_3", x: 24, y: 0, w: 12, h: 600, minW: 12, minH: 200 },
  ]);

  const generateDOM = () => {
    return chartLayout.map(({ i, h }) => {
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
    setChartLayout(newPosition);
  };
  const onResize = (chartLayout: any) => {
    setChartLayout(chartLayout);
  };

  const addOne = () => {
    const lastOne = chartLayout[chartLayout.length - 1];
    setChartLayout([
      ...chartLayout,
      {
        i: lastOne.i.split("_")[0] + "_" + lastOne.i.split("_")[1] + 1,
        x: 0,
        y: 0,
        w: 12,
        h: 200,
        minW: 12,
        minH: 200,
      },
    ]);
  };

  useEffect(() => {
    getPkBook().then((data) => {
      dispatch(setBookOptions(data));
    });
  }, []);

  return (
    <>
      {layoutState.isCollapsed ? "true" : "false"}
      <Button onClick={addOne}>add</Button>
      {windowSize.width}px
      <GridLayout
        width={windowSize.width - (layoutState.isCollapsed ? 150 : 270)}
        layout={chartLayout}
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
