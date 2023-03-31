import React, { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { formatDayjsToString, dayjsAgo, dayjsNow, yAxisFormatterNumber } from "@/utils";
import { getLpFlowBySecurity } from "@/api/statistic";
import * as echarts from "echarts";
import { Card, Row, Col, Button, DatePicker, Select } from "antd";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import useWindowSize from "@/utils/window-size";

const dateFormat = "YYYY/MM/DD";

type RangeValue = [dayjs.Dayjs, dayjs.Dayjs];

const LpFlowBySecurity = ({ height, chartId }: any) => {
  const windowSize = useWindowSize();
  const { RangePicker } = DatePicker;
  const [loading, setLoading] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [selectedDate, setSelectedDate] = useState<RangeValue>([
    dayjsAgo(4, "month"),
    dayjsAgo(3, "month"),
  ]);
  const [filterMode, setFilterMode] = useState("Security");
  const [response, setResponse] = useState({
    series: [],
    legend: { data: [] },
    xAxis: [{ data: [] }],
    series_by_lp: [],
    legend_by_lp: { data: [] },
    xAxis_by_lp: [{ data: [] }],
  });
  const chartRef = useRef<HTMLDivElement>(null);
  let myChart: echarts.ECharts;

  const onSelectedDateChange = (newDates: any) => {
    setSelectedDate(newDates);
  };

  const onModeChange = (mode: string) => {
    setFilterMode(mode);
  };

  const fetchChartData = async () => {
    setLoading(true);
    const params = {
      from: formatDayjsToString(selectedDate[0]),
      to: formatDayjsToString(selectedDate[1]),
    };
    await getLpFlowBySecurity(params).then((data) => {
      setResponse(data);
    });
  };

  const getOptionReady = () => {
    const { series, series_by_lp, legend_by_lp, xAxis_by_lp, legend, xAxis } = response;
    if (filterMode === "lp") {
      const returnValue = {
        title: {
          text: "LP Flow By LP",
          left: "center",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          top: "13%",
          bottom: "3%",
          containLabel: true,
        },
        yAxis: [
          {
            type: "value",
            axisLabel: {
              formatter: function (value: number) {
                return yAxisFormatterNumber(value);
              },
            },
          },
        ],
        series: series_by_lp.map((item: object) => ({
          label: {
            show: false,
            rotate: 90,
            align: "left",
            verticalAlign: "middle",
            position: "insideBottom",
            distance: 15,
            formatter: "{c}  {name|{a}}",
            fontSize: 14,
            rich: {
              name: {},
            },
          },
          ...item,
        })),
        xAxis: xAxis_by_lp,
        legend: { top: "25px", ...legend_by_lp },
      };
      return returnValue;
    } else {
      const returnValue = {
        title: {
          text: "LP Flow By Security",
          left: "center",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        yAxis: [
          {
            type: "value",
            axisLabel: {
              formatter: function (value: number) {
                return yAxisFormatterNumber(value);
              },
            },
          },
        ],
        grid: {
          left: "3%",
          right: "4%",
          top: "13%",
          bottom: "3%",
          containLabel: true,
        },
        series: series.map((item: object) => ({
          label: {
            show: false,
            rotate: 90,
            align: "left",
            verticalAlign: "middle",
            position: "insideBottom",
            distance: 15,
            formatter: "{c}  {name|{a}}",
            fontSize: 14,
            rich: {
              name: {},
            },
          },
          ...item,
        })),
        xAxis,
        legend: { top: "25px", ...legend },
      };
      return returnValue;
    }
  };

  useEffect(() => {
    fetchChartData();
  }, []);

  useEffect(() => {
    myChart = echarts.init(chartRef.current!);
    myChart.resize();
  }, [height, windowSize.width]);

  useEffect(() => {
    const option = getOptionReady();

    myChart = echarts.init(chartRef.current!);
    myChart.clear();
    setLoading(false);
    myChart.setOption(option, true);

    myChart.resize();
  }, [filterMode]);

  useEffect(() => {
    const option = getOptionReady();

    myChart = echarts.init(chartRef.current!);
    myChart.clear();
    setLoading(false);
    myChart.setOption(option, true);

    myChart.resize();
  }, [response]);

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

          <Select value={filterMode} onChange={onModeChange} style={{ width: "15%" }}>
            <Select.Option value="security">Security</Select.Option>
            <Select.Option value="lp">LP</Select.Option>
          </Select>
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

export default LpFlowBySecurity;
