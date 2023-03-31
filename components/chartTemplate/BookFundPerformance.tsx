import React, { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { formatDayjsToString, dayjsAgo, dayjsNow, yAxisFormatterNumber } from "@/utils";
import * as echarts from "echarts";
import { Card, Row, Col, Button, DatePicker, Select } from "antd";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import { getBookFundPerformance } from "@/api/statistic";
import { useSelector } from "react-redux";
import { book } from "@/store/bookSlice";
import useWindowSize from "@/utils/window-size";

const dateFormat = "YYYY/MM/DD";

type RangeValue = [dayjs.Dayjs, dayjs.Dayjs];

const BookFundPerformance = ({ height, chartId }: any) => {
  const bookState = useSelector(book);

  const windowSize = useWindowSize();

  const { RangePicker } = DatePicker;
  const [loading, setLoading] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [selectedDate, setSelectedDate] = useState<RangeValue>([dayjsAgo(1, "month"), dayjsNow()]);
  const [selectedBooks, setSelectedBooks] = useState(["S", "B"]);
  const chartRef = useRef<HTMLDivElement>(null);
  let myChart: echarts.ECharts;

  const onSelectedDateChange = (newDates: any) => {
    setSelectedDate(newDates);
  };
  const onSelectedBookChange = (bookList: any) => {
    setSelectedBooks(bookList);
  };

  const fetchChartData = async () => {
    setLoading(true);
    const params = {
      from: formatDayjsToString(selectedDate[0]),
      to: formatDayjsToString(selectedDate[1]),
      book_list: selectedBooks,
    };
    getBookFundPerformance(params).then((data) => {
      let newSeries: object[] = [];
      const categoryList = ["equity", "net_deposit", "volume"];
      for (const category of categoryList) {
        for (const bookData of data[category]) {
          newSeries.push({
            name:
              category.charAt(0).toUpperCase() +
              category.substring(1).replaceAll("_", " ") +
              "-" +
              bookData.name,
            type: bookData.type,
            symbolSize: 2,
            smooth: true,
            xAxisIndex: categoryList.indexOf(category),
            yAxisIndex: categoryList.indexOf(category),
            stack: category === "volume" ? "bar" : null,
            data: bookData.data,
          });
        }
      }

      const option = {
        title: {
          text: "Book Fund Performance",
          left: "center",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            animation: false,
          },
        },
        legend: {
          type: "scroll",
          top: "4%",
        },
        axisPointer: {
          link: [
            {
              xAxisIndex: "all",
            },
          ],
        },

        grid: [
          {
            left: 60,
            right: 20,
            top: "13%",
            height: "23%",
          },
          {
            left: 60,
            right: 20,
            top: "43%",
            height: "23%",
          },
          {
            left: 60,
            right: 20,
            top: "73%",
            height: "23%",
          },
        ],
        xAxis: [
          {
            type: "category",
            data: data.x_data,
            show: false,
          },
          {
            gridIndex: 1,
            type: "category",
            data: data.x_data,
            show: false,
          },
          {
            gridIndex: 2,
            type: "category",
            data: data.x_data,
          },
        ],
        yAxis: [
          {
            name: "Equity(USD)",
            type: "value",
            nameTextStyle: { fontWeight: "bold" },
            axisLabel: {
              formatter: (value: any) => yAxisFormatterNumber(value),
            },
          },
          {
            gridIndex: 1,
            name: "Net Deposit(USD)",
            type: "value",
            nameTextStyle: { fontWeight: "bold" },
            axisLabel: {
              formatter: (value: any) => yAxisFormatterNumber(value),
            },
          },
          {
            gridIndex: 2,
            name: "Volume(Lot)",
            type: "value",
            nameTextStyle: { fontWeight: "bold" },
            axisLabel: {
              formatter: (value: any) => yAxisFormatterNumber(value),
            },
          },
        ],
        series: newSeries,
      };

      myChart = echarts.init(chartRef.current!);
      myChart.clear();
      setLoading(false);
      myChart.setOption(option, true);
      myChart.resize();
    });
  };

  useEffect(() => {
    if (bookState.bookOptions.length) {
      fetchChartData();
    }
  }, [bookState.bookOptions]);

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
          <Select
            maxTagCount="responsive"
            mode="multiple"
            style={{ minWidth: "35%" }}
            value={selectedBooks}
            placeholder="Please select a book"
            onChange={onSelectedBookChange}
          >
            {bookState.bookOptions.map((item: any) => (
              <Select.Option key={item.book_id} value={item.book_name}>
                {item.book_name}
              </Select.Option>
            ))}
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

export default BookFundPerformance;
