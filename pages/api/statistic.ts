import request from '@/utils/request';

export function getBookFundPerformance(data: STATISTIC.QueryParam) {
    return request({
        url: 'statistic/book-fund-performance',
        method: 'POST',
        data,
    });
}

export function getLpFlow(data: STATISTIC.QueryParam) {
    return request({
        url: 'statistic/lp-flow-sankey',
        method: 'POST',
        data,
    });
}

export function getLpFlowBySecurity(data: STATISTIC.QueryParam) {
    return request({
        url: 'statistic/lp-flow-by-security',
        method: 'POST',
        data,
    });
}
