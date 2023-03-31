import { Tooltip, Button, Dropdown, Menu } from "antd";
import styled from "styled-components";
import { RollbackOutlined, SaveOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { layout, setChartLayout } from "@/store/layoutSlice";
import type { MenuProps } from "antd";

const LayoutMenu = styled.div`
  margin: 16px 0;
  display: inline-block;
  position: fixed;
  right: 0px;
  margin-right: 24px;
`;

const WorkSpaceButtons: React.FC = () => {
  const dispatch = useDispatch();
  const layoutState = useSelector(layout);
  const [loading, setLoading] = useState(false);
  const items: MenuProps["items"] = [
    { label: <div onClick={() => addNewChart("LpFlow")}>LP Flow</div>, key: "LpFlow" },
    {
      label: <div onClick={() => addNewChart("LpFlowBySecurity")}>LP Flow by Security</div>,
      key: "LpFlowBySecurity",
    },
    {
      label: <div onClick={() => addNewChart("BookFundPerformance")}>Book Fund Performance</div>,
      key: "BookFundPerformance",
    },
  ];
  const addNewChart = (chartType: string) => {
    const lastOne = layoutState.chartLayout[layoutState.chartLayout.length - 1];
    dispatch(
      setChartLayout([
        ...layoutState.chartLayout,
        {
          i: chartType + "_" + lastOne.i.split("_")[1] + 1,
          x: 0,
          y: 0,
          w: 12,
          h: 200,
          minW: 12,
          minH: 200,
        },
      ])
    );
  };

  return (
    <LayoutMenu>
      <Tooltip placement="top" title={<span>Click to revert layout</span>}>
        <Button
          size="middle"
          icon={<RollbackOutlined />}
          loading={loading}
          // @click="chartStore.revertToLastSaved"
        />
      </Tooltip>
      <Tooltip placement="top" title={<span>Choose to add chart</span>}>
        <Dropdown menu={{ items }}>
          <Button
            style={{ margin: "0px 6px" }}
            size="middle"
            loading={loading}
            icon={<PlusOutlined />}
          />
        </Dropdown>
      </Tooltip>
      <Tooltip placement="top" title={<span>Click to save layout</span>}>
        <Button
          size="middle"
          loading={loading}
          // :disabled="selectedProfile === 0"
          icon={<SaveOutlined />}
          // @click="profileStore.startSaving"
        />
      </Tooltip>
    </LayoutMenu>
  );
};

export default WorkSpaceButtons;
