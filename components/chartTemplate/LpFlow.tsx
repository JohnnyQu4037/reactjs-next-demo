import React, { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { formatDayjsToString, dayjsAgo, dayjsNow } from "@/utils";
import { getLpFlow } from "@/api/statistic";
import * as echarts from "echarts";
import { Card, Row, Col, Button, DatePicker } from "antd";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import useWindowSize from "@/utils/window-size";

const dateFormat = "YYYY/MM/DD";

type RangeValue = [dayjs.Dayjs, dayjs.Dayjs];

const LpFlow = ({ height, chartId }: any) => {
  const windowSize = useWindowSize();
  const { RangePicker } = DatePicker;
  const [loading, setLoading] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [selectedDate, setSelectedDate] = useState<RangeValue>([
    dayjsAgo(4, "month"),
    dayjsAgo(3, "month"),
  ]);
  const chartRef = useRef<HTMLDivElement>(null);
  let myChart: echarts.ECharts;

  const onSelectedDateChange = (newDates: any) => {
    setSelectedDate(newDates);
  };

  const fetchChartData = async () => {
    setLoading(true);
    const params = {
      from: formatDayjsToString(selectedDate[0]),
      to: formatDayjsToString(selectedDate[1]),
    };
    const { data, links } = await getLpFlow(params);
    const option = {
      title: {
        text: "LP Flow",
        left: "center",
      },
      series: {
        type: "sankey",
        layout: "none",
        emphasis: {
          focus: "adjacency",
        },
        data: data.map((item: string) => ({ name: item })),
        links,
      },
    };

    myChart = echarts.init(chartRef.current!);
    myChart.clear();
    setLoading(false);
    myChart.setOption(option, true);
    myChart.resize();
  };

  useEffect(() => {
    fetchChartData();
  }, []);

  useEffect(() => {
    myChart = echarts.init(chartRef.current!);
    myChart.resize();
  }, [height, windowSize.width]);

  useEffect(() => {
    if (selectedDate[0] && selectedDate[1]) {
      setButtonStatus(false);
    } else {
      setButtonStatus(true);
    }
  }, [selectedDate]);

  return (
    <Card style={{ width: "100%", padding: "12px", height: "100%" }}>
      <Row>
        <Col span={24}>
          <RangePicker
            style={{ width: "50%" }}
            format={dateFormat}
            defaultValue={selectedDate}
            onChange={onSelectedDateChange}
          />

          <Button
            type="primary"
            shape="circle"
            disabled={buttonStatus}
            loading={loading}
            size={"small"}
            style={{ marginLeft: "6px" }}
            onClick={fetchChartData}
            icon={<SearchOutlined />}
          />

          <Button type="link" style={{ position: "absolute", right: 0 }} icon={<CloseOutlined />} />
        </Col>
      </Row>
      <Row>
        <div id={chartId} ref={chartRef} style={{ width: "100%", height: height + "px" }} />
      </Row>
    </Card>
  );
};

export default LpFlow;
