import request from "@/utils/request";

export const getBookFundPerformance = (data: STATISTIC.QueryParam) => {
  return request({
    url: "statistic/book-fund-performance",
    method: "POST",
    data,
  });
};

export const getLpFlow = (data: STATISTIC.QueryParam) => {
  return request({
    url: "statistic/lp-flow-sankey",
    method: "POST",
    data,
  });
};

export const getLpFlowBySecurity = (data: STATISTIC.QueryParam) => {
  return request({
    url: "statistic/lp-flow-by-security",
    method: "POST",
    data,
  });
};
